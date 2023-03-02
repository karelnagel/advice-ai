import { getServerSession } from "next-auth";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import { Inter } from "next/font/google";
import { authOptions } from "~/server/auth";
import { Chats } from "./(main)/app/Chats";

const inter = Inter({ subsets: ["latin"] });

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className="h-screen w-screen" style={inter.style}>
          {session ? (
            <div className="grid h-screen w-screen grid-cols-4">
              {/* @ts-expect-error Server Component */}
              <Chats session={session} />
              {children}
            </div>
          ) : (
            children
          )}
        </body>
      </SessionProvider>
    </html>
  );
}
