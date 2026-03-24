import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function errorHandler(error: unknown) {
  console.error(error);

  if (error instanceof ZodError) {
    return NextResponse.json(
      { message: "Validation error", errors: error.issues },
      { status: 400 }
    );
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
