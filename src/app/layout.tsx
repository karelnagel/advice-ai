import { getServerSession } from "next-auth";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import { Inter } from "next/font/google";
import { authOptions } from "~/server/auth";
import { ClientProvider } from "./ClientProvider";
import { Toaster } from "~/components/Toaster";
import { type Metadata } from "next";
import Pwa from "./Pwa";

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
            <Pwa />
          </body>
        </ClientProvider>
      </SessionProvider>
    </html>
  );
}

const title = "GPT Friend";
const description = "A ChatGPT powered friend. Talk with anyone you want to.";
const url = "https://gptfriend.vercel.app";
export const metadata: Metadata = {
  title,
  description,
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover, maximum-scale=1",
  applicationName: "",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title,
    startupImage: "/icons/icon-512.png",
  },
  formatDetection: { telephone: false },
  themeColor: "#000000",
  manifest: "/manifest.json",
  icons: [
    {
      url: "/icons/icon-192.png",
    },
  ],
  twitter: {
    card: "summary",
    site: "@gptfriend",
    title,
    description,
  },
  openGraph: {
    title,
    description,
    type: "website",
    url,
    siteName: title,
    images: [
      {
        url: `${url}/icons/icon-512.png`,
        width: 512,
        height: 512,
        alt: title,
      },
    ],
  },
};
