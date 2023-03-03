"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { trpc } from "~/app/ClientProvider";

export default function New() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [prompt, setPrompt] = useState("");

  const { mutateAsync } = trpc.persons.new.useMutation();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const person = await mutateAsync({ name, image, prompt });

    router.push(`/chat/${person.id}`);
  };
  return (
    <div className="col-span-3 flex  flex-col items-center justify-center space-y-3">
      <p className="text-2xl">Create new person</p>
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
    </div>
  );
}
