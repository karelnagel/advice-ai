import { getServerSession } from "next-auth";
import Link from "next/link";
import { UserImage } from "~/components/UserImage";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import { Delete } from "./Delete";
import { Messages } from "./Messages";
import { IoIosArrowBack } from "react-icons/io";

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
          <button className="block text-xl md:hidden">
            <IoIosArrowBack />
          </button>

          <UserImage image={person.image} />
          <p className=" text-lg ">{person.name}</p>
        </div>
        <div className="space-x-2">
          {person.creatorId === session.user.id && (
            <Link href={`/chat/${id}/edit`}>Edit</Link>
          )}
          <Delete id={id} />
        </div>
      </div>
      <Messages
        messages={
          person.chats[0]?.messages.map((m) => ({
            content: m.content,
            role: m.role,
          })) || []
        }
        person={{
          id: person.id,
          image: person.image,
          name: person.name,
          prompt: person.prompt,
        }}
      />
    </div>
  );
}
