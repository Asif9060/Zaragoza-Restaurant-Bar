import { z } from "zod";

export const reservationSchema = z.object({
  date: z
    .string()
    .min(1, "Please select a date")
    .refine(
      (d) => new Date(d + "T00:00:00") >= new Date(new Date().toDateString()),
      "Date must be today or in the future"
    ),
  time: z.string().min(1, "Please select a time"),
  partySize: z
    .number()
    .int()
    .min(1, "At least 1 guest required")
    .max(20, "For parties over 20 please contact us"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50)
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50)
    .trim(),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(
      /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Please enter a valid US phone number"
    ),
  occasion: z
    .enum([
      "none",
      "birthday",
      "anniversary",
      "business",
      "graduation",
      "engagement",
      "other",
    ])
    .optional(),
  seatingPreference: z
    .enum(["no-preference", "indoor", "outdoor", "bar", "private"])
    .optional(),
  dietaryRestrictions: z.string().max(200).optional(),
  specialRequests: z.string().max(500).optional(),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100).trim(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required").max(200).trim(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000)
    .trim(),
  type: z.enum([
    "general",
    "event-inquiry",
    "private-dining",
    "feedback",
    "press",
    "other",
  ]),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

export const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  spanishName: z.string().max(100).optional(),
  description: z.string().min(1, "Description is required").max(500),
  price: z.coerce.number().min(0, "Price must be positive"),
  category: z.enum([
    "tapas-frias",
    "tapas-calientes",
    "paellas",
    "carnes",
    "mariscos",
    "postres",
    "cocktails",
    "vinos",
    "cervezas",
  ]),
  image: z.string().url().optional().or(z.literal("")),
  isVegetarian: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  isGlutenFree: z.boolean().optional(),
  isSignature: z.boolean().optional(),
  isAvailable: z.boolean(),
});

export type MenuItemFormData = z.infer<typeof menuItemSchema>;

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(150),
  description: z.string().min(1, "Description is required").max(500),
  longDescription: z.string().max(2000).optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  endTime: z.string().optional(),
  type: z.enum([
    "flamenco",
    "wine-tasting",
    "special-menu",
    "live-music",
    "holiday",
    "private",
    "other",
  ]),
  image: z.string().url().optional().or(z.literal("")),
  price: z.coerce.number().min(0).optional(),
  capacity: z.coerce.number().int().min(1).optional(),
  isRecurring: z.boolean().optional(),
  recurringNote: z.string().max(100).optional(),
  isActive: z.boolean(),
});

export type EventFormData = z.infer<typeof eventSchema>;
