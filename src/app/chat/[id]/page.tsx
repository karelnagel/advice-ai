import { getServerSession } from "next-auth";
import Link from "next/link";
import { UserImage } from "~/components/UserImage";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import { Delete } from "./Delete";
import { Messages } from "./Messages";
import { IoIosArrowBack } from "react-icons/io";
import { Message, Person } from "~/types";

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
    <div className="col-span-3 flex flex-col space-x-3 pt-3">
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center space-x-3">
          <Link href="/chat" className="block text-xl md:hidden">
            <IoIosArrowBack />
          </Link>

          <UserImage image={person.image} />
          <p className=" text-lg ">{person.name}</p>
        </div>
        <div className="space-x-2">
          {person.creatorId === session.user.id && (
            <Link href={`/chat/${id}/edit`}>Edit</Link>
          )}
          {person.chats[0] && <Delete id={id} />}
        </div>
      </div>
      <Messages
        messages={Message.array().parse(person.chats[0]?.messages || [])}
        person={Person.parse(person)}
      />
    </div>
  );
}
