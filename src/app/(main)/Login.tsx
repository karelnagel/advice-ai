"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const Login = ({ callback = "/chat" }: { callback?: string }) => {
  const { data: session } = useSession();
  const btn =
    "btn border-0 bg-gradient-to-tr from-primary to-primary text-primary-content rounded-full text-white px-10 flex space-x-2";
  if (session)
    return (
      <Link href="/chat" className={btn}>
        Go to App
      </Link>
    );
  return (
    <button
      onClick={() => void signIn("google", { callbackUrl: callback })}
      className={btn}
    >
      <Image src="/google.png" alt="Google" width={24} height={24} />
      <span>Sign in with Google</span>
    </button>
  );
};
