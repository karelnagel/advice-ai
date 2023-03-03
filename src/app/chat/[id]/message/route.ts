/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "~/env.mjs";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import type { ParsedEvent, ReconnectInterval } from "eventsource-parser";
import { createParser } from "eventsource-parser";
import type { Message } from "~/types";
import { defaultPrompt } from "~/config";

// export const runtime = "experimental-edge";

export const POST = async (
  req: NextRequest,
  ctx: { params: { id: string } }
) => {
  const personId = ctx.params.id;
  const { message } = (await req.json()) as {
    message: string;
  };
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.error();

  const userId = session.user.id;

  await prisma.message.create({
    data: {
      content: message,
      role: "user",
      chat: {
        connectOrCreate: {
          where: { personId_userId: { personId, userId } },
          create: {
            person: { connect: { id: personId } },
            user: { connect: { id: userId } },
          },
        },
      },
    },
  });
  const chat = await prisma.chat.findUnique({
    where: {
      personId_userId: { personId, userId },
    },
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      person: true,
    },
  });
  if (!chat) return NextResponse.error();

  chat.messages.reverse();
  const messages: Message[] = [
    {
      role: "system",
      content: chat.person.prompt || defaultPrompt(chat.person.name),
    },
    ...(chat.messages.map((m) => ({ role: m.role, content: m.content })) || []),
  ];
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      stream: true,
    }),
  });
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let counter = 0;
  let value = "";
  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            const end = async () => {
              await prisma.message.create({
                data: {
                  content: value,
                  role: "assistant",
                  chat: { connect: { personId_userId: { personId, userId } } },
                },
              });
              controller.close();
            };
            void end();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = (json.choices[0].delta?.content as string) || "";
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }
            const queue = encoder.encode(text);
            value += text;
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            controller.error(e);
          }
        }
      }
      const parser = createParser(onParse);
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });
  return new Response(stream);
};
