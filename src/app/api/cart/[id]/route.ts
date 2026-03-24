import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { errorHandler } from "@/lib/error-handler";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { quantity } = body;

    const cartItem = await prisma.cartItem.update({
      where: { id: params.id },
      data: { quantity },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.cartItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Item removed" });
  } catch (error) {
    return errorHandler(error);
  }
}
