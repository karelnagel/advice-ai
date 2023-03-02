import { prisma } from "~/server/db";
import { Edit } from "./Edit";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const person = await prisma.person.findUnique({ where: { id } });
  if (!person) return <div>No person</div>;
  return (
    <div className="col-span-3 flex  flex-col items-center justify-center space-y-3">
      <p className="text-2xl">Create new person</p>
      <Edit
        name={person.name}
        image={person.image}
        prompt={person.prompt}
        id={id}
      />
    </div>
  );
}
