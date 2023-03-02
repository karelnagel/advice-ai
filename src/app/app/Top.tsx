"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { UserImage } from "~/component/UserImage";

export const Top = ({ image }: { image?: string | null }) => {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center space-x-3 ">
        <div className="dropdown">
          <button tabIndex={0}>
            <UserImage image={image} />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-52 bg-base-300 p-2 shadow"
          >
            <li>
              <button className="text-error" onClick={() => void signOut()}>
                Log out
              </button>
            </li>
          </ul>
        </div>
        <Link href="/app" className="text-lg font-semibold">
          Messages
        </Link>
      </div>
      <Link href="/app/new">
        <NewIcon />
      </Link>
    </div>
  );
};

const NewIcon = () => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="currentColor"
      height="32"
      width="32"
      data-darkreader-inline-fill=""
    >
      <path d="M17.305 16.57a1.998 1.998 0 00-.347.467l-1.546 2.87a.5.5 0 00.678.677l2.87-1.545c.171-.093.328-.21.466-.347l8.631-8.631a1.5 1.5 0 10-2.121-2.122l-8.631 8.632z"></path>
      <path d="M18 10.5a1 1 0 001-1V9a1 1 0 00-1-1h-6a4 4 0 00-4 4v12a4 4 0 004 4h12a4 4 0 004-4v-6a1 1 0 00-1-1h-.5a1 1 0 00-1 1v6a1.5 1.5 0 01-1.5 1.5H12a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5h6z"></path>
    </svg>
  );
};
