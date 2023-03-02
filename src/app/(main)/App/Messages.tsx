import { Session } from "next-auth";

export const Messages = ({ session }: { session: Session }) => {
    return (
      <div className="space-y-3 border-r p-3">
        <div className="flex items-center justify-between ">
          <div className="flex items-center space-x-3 ">
            <img
              src={session.user.image || "/google.png"}
              alt="avatar"
              className=" aspect-square h-10 rounded-full"
            />
            <p className="text-lg font-semibold">Messages</p>
          </div>
  
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
        </div>
        <div className="">
          <input type="text" placeholder="Search people" className="input" />
        </div>
        <div>
          <div className="flex items-center space-x-3">
            <img src="/google.png" className="aspect-square h-10" />
            <div>
              <p>Elon Musk</p>
              <p className="space-x-1 text-xs opacity-60">
                <span className="text-xs">How are you doing?</span>
                <span>•</span>
                <span className="">25 min ago</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  