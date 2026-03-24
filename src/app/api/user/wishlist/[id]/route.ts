export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { errorHandler } from "@/lib/error-handler";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await prisma.wishlist.delete({
      where: { id: params.id, userId: (session.user as any).id },
    });

    return NextResponse.json({ message: "Item removed from wishlist" });
  } catch (error) {
    return errorHandler(error);
  }
}
