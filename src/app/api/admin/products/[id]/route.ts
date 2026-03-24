import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { errorHandler } from "@/lib/error-handler";

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return (session?.user as any)?.role === "ADMIN";
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const data = productSchema.partial().parse(body);

    const product = await prisma.product.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(product);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    return errorHandler(error);
  }
}
