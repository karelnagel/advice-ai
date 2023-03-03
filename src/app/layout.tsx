import { getServerSession } from "next-auth";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import { Inter } from "next/font/google";
import { authOptions } from "~/server/auth";
import { ClientProvider } from "./ClientProvider";
import { Toaster } from "~/components/Toaster";

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
        <ClientProvider>
          <body className="h-screen w-screen" style={inter.style}>
            {children}
            <Toaster />
          </body>
        </ClientProvider>
      </SessionProvider>
    </html>
  );
}
