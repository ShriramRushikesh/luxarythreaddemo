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

    const salesOverTime = await prisma.order.groupBy({
      by: ["createdAt"],
      where: { paymentStatus: "PAID" },
      _sum: { total: true },
      orderBy: { createdAt: "asc" },
    });

    const categoryStats = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json({
      salesOverTime,
      categoryStats: categoryStats.map((c: any) => ({
        name: c.category,
        value: c._count.products || 0
      }))
    });
  } catch (error) {
    return errorHandler(error);
  }
}
