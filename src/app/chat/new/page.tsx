"use client";

import { useRouter } from "next/navigation";
import { trpc } from "~/app/ClientProvider";
import { EditPerson } from "~/components/EditPerson";

export default function New() {
  const router = useRouter();
  const { mutateAsync } = trpc.persons.new.useMutation();

  return (
    <div className="col-span-3 flex  flex-col items-center justify-center space-y-3">
      <p className="text-2xl">Create new person</p>
      <EditPerson
        name={""}
        image={""}
        prompt={""}
        submit={async (name, image, prompt) => {
          const person = await mutateAsync({ name, image, prompt });
          router.push(`/chat/${person.id}`);
        }}
      />
    </div>
  );
}
