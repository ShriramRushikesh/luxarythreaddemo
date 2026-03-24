import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { errorHandler } from "@/lib/error-handler";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: true,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    return errorHandler(error);
  }
}
