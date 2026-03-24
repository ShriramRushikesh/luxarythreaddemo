import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { addressSchema } from "@/lib/validations";
import { errorHandler } from "@/lib/error-handler";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = addressSchema.parse(body);

    const address = await prisma.address.create({
      data: {
        ...data,
        userId: (session.user as any).id,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    return errorHandler(error);
  }
}
