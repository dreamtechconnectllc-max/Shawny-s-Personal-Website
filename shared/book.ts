import { z } from "zod";

export const book = {
  title: "The L&D Strategic Partner",
  subtitle: "Your Guide in the Startup Environment",
  author: "Shawny Hargrove",
  // Update when a release date is set, e.g. "Spring 2027".
  releaseLabel: "Coming Soon",
};

// Formats readers can reserve. Edit to match what will actually be published.
export const bookFormats = ["Paperback", "eBook"] as const;

export const preorderSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(100),
  lastName: z.string().trim().min(1, "Please enter your last name").max(100),
  email: z.string().trim().email("Please enter a valid email address"),
  organization: z.string().trim().max(200).optional().default(""),
  role: z.string().trim().max(200).optional().default(""),
  format: z.enum(bookFormats, { errorMap: () => ({ message: "Please choose a format" }) }),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1").max(100, "For orders over 100 copies, please get in touch directly"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to be contacted about your pre-order" }),
  }),
});

export type Preorder = z.infer<typeof preorderSchema>;
