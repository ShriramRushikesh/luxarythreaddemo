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

    const [totalOrders, totalProducts, totalCustomers, totalRevenue] = await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.user.count({ where: { role: "USER" } }),
      prisma.order.aggregate({
        where: { paymentStatus: "PAID" },
        _sum: { total: true },
      }),
    ]);

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    });

    return NextResponse.json({
      stats: {
        totalOrders,
        totalProducts,
        totalCustomers,
        totalRevenue: totalRevenue._sum.total || 0,
      },
      recentOrders,
    });
  } catch (error) {
    return errorHandler(error);
  }
}
