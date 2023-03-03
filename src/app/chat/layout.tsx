import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import { Chat } from "~/types";
import { Left } from "../../components/Left/Left";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  const chats = await prisma.chat.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      person: true,
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grid h-full w-screen grid-cols-1 md:grid-cols-4">
      <Left chats={Chat.array().parse(chats)} />
      {children}
    </div>
  );
}
