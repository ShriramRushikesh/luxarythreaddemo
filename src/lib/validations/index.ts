import { z } from "zod";

// User Schemas
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const profileUpdateSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
});

// Product Schemas
export const productSchema = z.object({
  sku: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  categoryId: z.string(),
  brandId: z.string(),
  price: z.number().positive(),
  salePrice: z.number().optional().nullable(),
  costPrice: z.number().optional().nullable(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

// Address Schemas
export const addressSchema = z.object({
  type: z.enum(["SHIPPING", "BILLING"]),
  fullName: z.string(),
  phone: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string().optional().nullable(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.string(),
  isDefault: z.boolean().default(false),
});

// Order Schemas
export const orderStatusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"]),
});

// Coupon Schemas
export const couponSchema = z.object({
  code: z.string(),
  type: z.enum(["PERCENTAGE", "FIXED"]),
  value: z.number(),
  minOrderValue: z.number().optional().nullable(),
  maxDiscount: z.number().optional().nullable(),
  usageLimit: z.number().optional().nullable(),
  expiresAt: z.string().datetime().optional().nullable(),
  isActive: z.boolean().default(true),
});

// Newsletter
export const newsletterSchema = z.object({
  email: z.string().email(),
});

// Review
export const reviewSchema = z.object({
  productId: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  comment: z.string(),
});
