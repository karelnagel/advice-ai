"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { trpc } from "~/app/ClientProvider";

export const Edit = (props: {
  id: string;
  name: string;
  image: string;
  prompt: string;
}) => {
  const router = useRouter();

  const [name, setName] = useState(props.name);
  const [image, setImage] = useState(props.image);
  const [prompt, setPrompt] = useState(props.prompt);
  const { mutateAsync } = trpc.persons.edit.useMutation();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const person = await mutateAsync({ id: props.id, name, image, prompt });

    router.push(`/chat/${person.id}`);
  };
  return (
    <form
      action=""
      className="flex w-96 flex-col  space-y-2"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={(e) => submit(e)}
    >
      <input
        type="text"
        placeholder="Name"
        className="input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        className="input"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <textarea
        placeholder="Prompt"
        className="textarea bg-base-200"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button type="submit" className="btn-primary btn">
        Submit
      </button>
    </form>
  );
};
