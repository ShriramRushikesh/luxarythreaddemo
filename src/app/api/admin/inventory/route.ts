export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { errorHandler } from "@/lib/error-handler";


async function isAdmin() {
  const session = await getServerSession(authOptions);
  return (session?.user as any)?.role === "ADMIN";
}

export async function GET() {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const inventory = await prisma.productVariant.findMany({
      include: {
        product: {
          select: { name: true, sku: true },
        },
      },
      orderBy: { stock: "asc" },
    });

    return NextResponse.json(inventory);
  } catch (error) {
    return errorHandler(error);
  }
}
