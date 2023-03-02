"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export const Delete = ({ id }: { id: string }) => {
  const router = useRouter();
  const del = async () => {
    await axios.delete(`/${id}/delete`);
    router.push("/");
  };
  return <button onClick={() => void del()}>Delete</button>;
};
