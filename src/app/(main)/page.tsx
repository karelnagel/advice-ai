import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { App } from "./app";
import { Landing } from "./landing";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) return <App />;
  else return <Landing />;
}
