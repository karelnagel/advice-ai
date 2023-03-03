"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { trpc } from "../ClientProvider";

export const Search = () => {
  const [input, setInput] = useState("");
  const { data, mutate } = trpc.persons.search.useMutation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      mutate({ search: input });
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [input, mutate]);

  return (
    <div className="dropdown w-full">
      <input
        type="text"
        placeholder="Search people"
        className="input"
        value={input}
        tabIndex={0}
        onChange={(e) => setInput(e.target.value)}
      />
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box w-full bg-base-300 p-2 shadow"
      >
        {data?.persons?.map((person) => (
          <li key={person.id}>
            <Link href={`/app/${person.id}`} className="flex">
              <img
                alt={person.image}
                src={person.image}
                className="aspect-square h-10 rounded-full bg-base-200"
              />
              <p>{person.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
