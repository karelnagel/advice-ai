import { createTRPCRouter } from "~/server/api/trpc";
import { chat } from "~/server/api/routers/chat";
import { persons } from "./routers/persons";

export const appRouter = createTRPCRouter({
  chat,
  persons,
});

export type AppRouter = typeof appRouter;
