"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const Login = ({ callback = "/chat" }: { callback?: string }) => {
  const { data: session } = useSession();
  if (session)
    return (
      <Link href="/chat" className="btn">
        Go to App
      </Link>
    );
  return (
    <button
      onClick={() => void signIn("google", { callbackUrl: callback })}
      className=" btn flex space-x-2"
    >
      <Image src="/google.png" alt="Google" width={20} height={20} />
      <span>Sign in with Google</span>
    </button>
  );
};
