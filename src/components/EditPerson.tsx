"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { defaultPrompt } from "~/config";

export const EditPerson = (props: {
  name: string;
  image: string;
  prompt: string;
  submit: (name: string, image: string, prompt: string) => Promise<void>;
}) => {
  const [name, setName] = useState(props.name);
  const [image, setImage] = useState(props.image);
  const [prompt, setPrompt] = useState(props.prompt);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await props.submit(name, image, prompt);
  };
  return (
    <form
      className="flex w-96 flex-col space-y-2 px-2"
      onSubmit={(e) => void submit(e)}
    >
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Elon Musk"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Image URL</span>
        </label>
        <input
          type="text"
          placeholder="Paste their image URL here"
          className="input"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Prompt</span>
        </label>
        <textarea
          placeholder={defaultPrompt(name)}
          className="textarea min-h-[200px] bg-base-200"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <button type="submit" className="btn-primary btn">
        Submit
      </button>
    </form>
  );
};
