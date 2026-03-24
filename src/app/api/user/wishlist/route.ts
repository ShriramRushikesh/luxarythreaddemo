import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { errorHandler } from "@/lib/error-handler";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const wishlist = await prisma.wishlist.findMany({
      where: { userId: (session.user as any).id },
      include: {
        product: {
          include: {
            images: { where: { isPrimary: true }, take: 1 },
          },
        },
      },
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { productId } = body;

    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId: (session.user as any).id,
        productId,
      },
    });

    return NextResponse.json(wishlistItem);
  } catch (error) {
    return errorHandler(error);
  }
}
