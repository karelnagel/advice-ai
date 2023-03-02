import { getServerSession } from "next-auth";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import { Inter } from "next/font/google";
import { authOptions } from "~/server/auth";

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
        <body className="h-full w-screen" style={inter.style}>
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
