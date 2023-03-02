import type { Role } from "@prisma/client";

export type Message = { role: Role; content: string };
