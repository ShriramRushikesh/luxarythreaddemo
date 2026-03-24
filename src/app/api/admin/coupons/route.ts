import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { couponSchema } from "@/lib/validations";
import { errorHandler } from "@/lib/error-handler";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return (session?.user as any)?.role === "ADMIN";
}

export async function POST(req: Request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const data = couponSchema.parse(body);

    const coupon = await prisma.coupon.create({
      data: {
        ...data,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      },
    });

    return NextResponse.json(coupon, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
