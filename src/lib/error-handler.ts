import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export function errorHandler(error: unknown) {
  console.error(error);

  if (error instanceof ZodError) {
    return NextResponse.json(
      { message: "Validation error", errors: error.issues },
      { status: 400 }
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle unique constraint violations
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "A record with this value already exists." },
        { status: 409 }
      );
    }
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "An unexpected error occurred" },
    { status: 500 }
  );
}
