"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export const Login = ({ callback = "/" }: { callback?: string }) => {
  return (
    <button
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={() => signIn("google", { callbackUrl: callback })}
      className="btn-neutral btn flex space-x-2"
    >
      <Image src="/google.png" alt="Google" width={20} height={20} />
      <span>Sign in with Google</span>
    </button>
  );
};
