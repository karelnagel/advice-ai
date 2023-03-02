"use client";

import type { Person } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

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
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !image || !prompt) return;
    const res = await axios.post(`/app/${props.id}/edit/edit`, {
      name,
      image,
      prompt,
    });
    const person = res.data as Person;

    router.push(`/app/${person.id}`);
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
