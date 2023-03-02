import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "~/server/db";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search") || undefined;
  const persons = await prisma.person.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { prompt: { contains: search, mode: "insensitive" } },
      ],
    },
    take: 8,
  });
  return NextResponse.json(persons);
}
