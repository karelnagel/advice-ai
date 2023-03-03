import z from "zod";

export const Message = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});
export type Message = z.infer<typeof Message>;
export const Person = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  prompt: z.string(),
  chats: z
    .array(
      z.object({
        id: z.string(),
        messages: z.array(Message).optional(),
      })
    )
    .optional(),
});
export type Person = z.infer<typeof Person>;

export const Chat = z.object({
  id: z.string(),
  person: z
    .object({
      id: z.string(),
      name: z.string(),
      image: z.string(),
    })
    .optional(),
  messages: z.array(Message).optional(),
});
export type Chat = z.infer<typeof Chat>;
