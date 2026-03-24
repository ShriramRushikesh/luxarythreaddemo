import { NextResponse } from "next/server";
import crypto from "crypto";
import { errorHandler } from "@/lib/error-handler";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { paymentId, orderId, signature } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      throw new Error("Razorpay secret not configured");
    }

    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generated_signature !== signature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 400 }
      );
    }

    // Logic to update order status in DB would go here
    // For now returning success

    return NextResponse.json({ message: "Payment verified" });
  } catch (error) {
    return errorHandler(error);
  }
}
