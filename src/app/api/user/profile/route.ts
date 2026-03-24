import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { profileUpdateSchema } from "@/lib/validations";
import { errorHandler } from "@/lib/error-handler";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: (session.user as any).id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true,
        addresses: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = profileUpdateSchema.parse(body);

    const user = await prisma.user.update({
      where: { id: (session.user as any).id },
      data,
    });

    return NextResponse.json(user);
  } catch (error) {
    return errorHandler(error);
  }
}
