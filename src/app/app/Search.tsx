"use client";

import type { Person } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Search = () => {
  const [input, setInput] = useState("");
  const [people, setPeople] = useState<Person[]>();
  useEffect(() => {
    const search = async () => {
      if (!input) return;
      const res = await axios.get<Person[]>("/app/search", {
        params: { search: input },
      });
      setPeople(res.data);
    };
    const timeout = setTimeout(() => {
      void search();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

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
        {people?.map((person) => (
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
