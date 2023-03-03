import { prisma } from "~/server/db";
import { Person } from "~/types";
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
      <p className="text-2xl">Edit Person</p>
      <Edit {...Person.parse(person)} />
    </div>
  );
}
