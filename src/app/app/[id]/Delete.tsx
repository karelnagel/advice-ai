"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export const Delete = ({ id }: { id: string }) => {
  const router = useRouter();
  const del = async () => {
    await axios.delete(`/app/${id}/delete`, { params: { id } });
    router.push(`/app`);
  };
  return <button onClick={() => void del()}>Delete</button>;
};
