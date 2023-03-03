"use client";

import { useRouter } from "next/navigation";
import { trpc } from "~/app/ClientProvider";

export const Delete = ({ id }: { id: string }) => {
  const router = useRouter();
  const { mutateAsync } = trpc.chat.delete.useMutation();
  const del = async () => {
    await mutateAsync({ id });
    router.refresh();
    router.push(`/app`);
  };
  return <button onClick={() => void del()}>Restart</button>;
};
