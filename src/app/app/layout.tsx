import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { UserImage } from "~/component/UserImage";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import { Search } from "./Search";

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
    <div className="grid h-screen w-screen grid-cols-4">
      <div className="space-y-3 border-r p-3">
        <div className="flex items-center justify-between ">
          <div className="flex items-center space-x-3 ">
            <UserImage image={session.user.image} />
            <p className="text-lg font-semibold">Messages</p>
          </div>
          <Link href="/app/new">
            <NewIcon />
          </Link>
        </div>
        <div className="">
          <Search />
        </div>
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

const NewIcon = () => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="currentColor"
      height="32"
      width="32"
      data-darkreader-inline-fill=""
    >
      <path d="M17.305 16.57a1.998 1.998 0 00-.347.467l-1.546 2.87a.5.5 0 00.678.677l2.87-1.545c.171-.093.328-.21.466-.347l8.631-8.631a1.5 1.5 0 10-2.121-2.122l-8.631 8.632z"></path>
      <path d="M18 10.5a1 1 0 001-1V9a1 1 0 00-1-1h-6a4 4 0 00-4 4v12a4 4 0 004 4h12a4 4 0 004-4v-6a1 1 0 00-1-1h-.5a1 1 0 00-1 1v6a1.5 1.5 0 01-1.5 1.5H12a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5h6z"></path>
    </svg>
  );
};
