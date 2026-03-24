import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { reviewSchema } from "@/lib/validations";
import { errorHandler } from "@/lib/error-handler";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = reviewSchema.parse(body);

    const review = await prisma.review.create({
      data: {
        ...data,
        userId: (session.user as any).id,
        isApproved: false, // Reviews need manual approval
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    return errorHandler(error);
  }
}
