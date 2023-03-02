import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import { Messages } from "./Messages";

export default async function Chat({
  params: { personId },
}: {
  params: { personId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const chat = await prisma.chat.findFirst({
    where: {
      personId,
      userId: session.user.id,
    },
    include: {
      person: true,
      messages: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!chat) return <div>Chat not found</div>;
  return (
    <div className="col-span-3 flex flex-col space-x-3 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={chat.person.image} className="aspect-square h-10" />
          <p className=" text-lg ">{chat.person.name}</p>
        </div>
      </div>
      <Messages chat={chat} />
    </div>
  );
}
