import Link from "next/link";
import { Login } from "./Login";

export const Header = () => {
  return (
    <div className="w-full  bg-base-300 bg-opacity-70 shadow-md">
      <div className="navbar m-auto w-full max-w-screen-lg justify-between">
        <Link href="/" className="text-xl font-bold ">
          GPT Friend
        </Link>
        <Login callback="/" />
      </div>
    </div>
  );
};
