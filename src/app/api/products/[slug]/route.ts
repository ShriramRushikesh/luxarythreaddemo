import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { errorHandler } from "@/lib/error-handler";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: {
        category: true,
        brand: true,
        images: true,
        variants: true,
        reviews: {
          where: { isApproved: true },
          include: {
            user: {
              select: { name: true },
            },
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return errorHandler(error);
  }
}
