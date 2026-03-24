export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { errorHandler } from "@/lib/error-handler";

export async function GET() {
  try {
    const brands = await prisma.brand.findMany();
    return NextResponse.json(brands);
  } catch (error) {
    return errorHandler(error);
  }
}
