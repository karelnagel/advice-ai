import Link from "next/link";
import { UserImage } from "~/components/UserImage";
import { prisma } from "~/server/db";

export default async function Page() {
  const people = await prisma.person.findMany({
    orderBy: { featured: "desc" },
    take: 6,
  });
  return (
    <div className="col-span-3 flex h-full w-full items-center justify-center">
      <div className="flex flex-col space-y-6 px-2 text-center">
        <p className="text-2xl ">Start a New Conversation</p>
        <div className="grid w-96 grid-cols-2 gap-3">
          {people.map((p) => (
            <Link
              href={`/chat/${p.id}`}
              key={p.id}
              className="flex items-center space-x-3 rounded-lg bg-base-300 p-2"
            >
              <UserImage image={p.image} />
              <p>{p.name}</p>
            </Link>
          ))}
        </div>
        <div className="divider">or</div>
        <Link href="/chat/new" className="btn-primary btn">
          Create New
        </Link>
      </div>
    </div>
  );
}
