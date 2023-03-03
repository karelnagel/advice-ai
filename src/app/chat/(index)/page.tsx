import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const lastChat = await prisma.chat.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  if (lastChat) redirect(`/chat/${lastChat.personId}`);
  else redirect("/chat/start");
}
