import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { errorHandler } from "@/lib/error-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!session?.user && !sessionId) {
      return NextResponse.json({ items: [] });
    }

    const cart = await prisma.cart.findFirst({
      where: {
        OR: [
          { userId: (session?.user as any)?.id },
          { sessionId: sessionId || undefined },
        ],
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    return NextResponse.json(cart || { items: [] });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { productId, variantId, quantity, price, sessionId } = body;

    let cart = await prisma.cart.findFirst({
      where: {
        OR: [
          { userId: (session?.user as any)?.id },
          { sessionId: sessionId || undefined },
        ],
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: (session?.user as any)?.id,
          sessionId: !session?.user ? sessionId : null,
        },
      });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        variantId,
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          variantId,
          quantity,
          price,
        },
      });
    }

    return NextResponse.json({ message: "Added to cart" });
  } catch (error) {
    return errorHandler(error);
  }
}
