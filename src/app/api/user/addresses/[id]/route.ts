export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { addressSchema } from "@/lib/validations";
import { errorHandler } from "@/lib/error-handler";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = addressSchema.partial().parse(body);

    const address = await prisma.address.update({
      where: { id: params.id, userId: (session.user as any).id },
      data,
    });

    return NextResponse.json(address);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await prisma.address.delete({
      where: { id: params.id, userId: (session.user as any).id },
    });

    return NextResponse.json({ message: "Address deleted" });
  } catch (error) {
    return errorHandler(error);
  }
}
