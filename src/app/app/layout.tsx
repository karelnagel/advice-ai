import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { UserImage } from "~/component/UserImage";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import { Search } from "./Search";
import { Top } from "./Top";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  const chats = await prisma.chat.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      person: true,
      messages: { orderBy: { createdAt: "desc" } },
    },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="grid h-screen w-screen grid-cols-3 md:grid-cols-4">
      <div className="space-y-3 border-r p-3 hidden md:block">
        <Top image={session.user.image} />
          <Search />
        <div className="space-y-3">
          {chats.map((chat) => {
            const lastMessage = chat.messages[0];
            const minAgo = minutesPassed(lastMessage?.createdAt);
            return (
              <Link
                href={`/app/${chat.person.id}`}
                key={chat.id}
                className="flex items-center space-x-3"
              >
                <UserImage image={chat.person.image} />
                <div>
                  <p>{chat.person.name}</p>
                  <div className="flex space-x-1 text-xs opacity-60">
                    <p className="text-xs line-clamp-1">
                      {lastMessage?.content}
                    </p>
                    <p>•</p>
                    <p className="whitespace-nowrap">
                      {minAgo ? `${minAgo} min ago` : "now"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {children}
    </div>
  );
}

const minutesPassed = (date?: Date) => {
  if (!date) return;
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return Math.round(diff / (1000 * 60));
};
