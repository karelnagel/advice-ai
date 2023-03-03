"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserImage } from "~/components/UserImage";
import { type Chat } from "~/types";
import { Search } from "./Search";
import { Top } from "./Top";

export const Left = ({ chats }: { chats: Chat[] }) => {
  const pathname = usePathname();
  return (
    <div
      className={`${
        pathname === "/chat" ? "" : "hidden"
      } space-y-3 border-r p-3 md:block`}
    >
      <Top />
      <Search />
      <div className="space-y-3">
        {chats.map((chat) => {
          const lastMessage = chat.messages[0];
          //   const minAgo = minutesPassed(lastMessage?.createdAt);
          return (
            <Link
              href={`/chat/${chat.person.id}`}
              key={chat.id}
              className="flex items-center space-x-3"
            >
              <UserImage image={chat.person.image} />
              <div>
                <p>{chat.person.name}</p>
                <div className="flex space-x-1 text-xs opacity-60">
                  <p className="text-xs line-clamp-1">{lastMessage?.content}</p>
                  <p>•</p>
                  {/* <p className="whitespace-nowrap">
                    {minAgo ? `${minAgo} min ago` : "now"}
                  </p> */}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const minutesPassed = (date?: Date) => {
  if (!date) return;
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return Math.round(diff / (1000 * 60));
};
