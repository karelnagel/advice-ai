import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import { Messages } from "./Messages";

export default async function Chat({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const person = await prisma.person.findUnique({
    where: { id },
    include: {
      chats: {
        where: { userId: session.user.id },
        include: { messages: true },
      },
    },
  });

  if (!person) return <div>Person not found</div>;
  return (
    <div className="col-span-3 flex flex-col space-x-3 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            alt={person.name}
            src={person.image}
            className="aspect-square h-10"
          />
          <p className=" text-lg ">{person.name}</p>
        </div>
      </div>
      <Messages messages={person.chats[0]?.messages || []} person={person} />
    </div>
  );
}
