import type { Session } from "next-auth";
import { Message } from "./Message";
import { Messages } from "./Messages";

export const App = ({ session }: { session: Session }) => {
  return (
    <div className="grid h-screen w-screen grid-cols-4">
      <Messages session={session} />
      <Message />
    </div>
  );
};
