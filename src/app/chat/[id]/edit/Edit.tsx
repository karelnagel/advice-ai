"use client";

import { useRouter } from "next/navigation";
import { trpc } from "~/app/ClientProvider";
import { EditPerson } from "~/components/EditPerson";

export const Edit = (props: {
  id: string;
  name: string;
  image: string;
  prompt: string;
}) => {
  const router = useRouter();
  const { mutateAsync } = trpc.persons.edit.useMutation();

  return (
    <EditPerson
      {...props}
      submit={async (name, image, prompt) => {
        const person = await mutateAsync({ id: props.id, name, image, prompt });
        router.push(`/chat/${person.id}`);
      }}
    />
  );
};
