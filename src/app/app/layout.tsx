import { getServerSession } from "next-auth";
import type { ReactNode } from "react";
import { authOptions } from "~/server/auth";
import { Chats } from "./Chats";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <div className="grid h-screen w-screen grid-cols-4">
      {/* @ts-expect-error Server Component */}
      <Chats session={session} />
      {children}
    </div>
  );
}
