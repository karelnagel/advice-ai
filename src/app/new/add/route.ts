import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";

export async function POST(req: NextRequest) {
  const { name, image, prompt } = (await req.json()) as {
    name: string;
    image: string;
    prompt: string;
  };
  const session = await getServerSession(authOptions);
  if (!session) return { status: 401 };
  const person = await prisma.person.create({
    data: {
      name,
      image,
      prompt,
      creator: { connect: { id: session.user.id } },
    },
  });
  return NextResponse.json(person);
}
