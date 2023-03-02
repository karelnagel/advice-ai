import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { App } from "./App";
import { Landing } from "./Landing";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) return <App />;
  else return <Landing />;
  
}
