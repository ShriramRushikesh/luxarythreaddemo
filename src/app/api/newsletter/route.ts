export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations";
import { errorHandler } from "@/lib/error-handler";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = newsletterSchema.parse(body);

    const subscriber = await prisma.newsletter.upsert({
      where: { email },
      update: { isSubscribed: true },
      create: { email, isSubscribed: true },
    });

    return NextResponse.json({ message: "Subscribed successfully", subscriber });
  } catch (error) {
    return errorHandler(error);
  }
}
