import { getServerSession } from "next-auth";
import "./globals.css";
import SessionProvider from "./SessionProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body> {children}</body>
      </SessionProvider>
    </html>
  );
}
