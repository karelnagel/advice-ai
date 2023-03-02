import Link from "next/link";
import { Login } from "./Login";

export const Header = () => {
  return (
    <div className="bg-base-300 absolute z-20 w-full bg-opacity-70 shadow-md">
      <div className="navbar m-auto w-full max-w-screen-lg justify-between">
        <Link href="/" className="text-lg font-bold uppercase">
          Advice
        </Link>
        <Login callback="/" />
      </div>
    </div>
  );
};
