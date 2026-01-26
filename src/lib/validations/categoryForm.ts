import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string("Name field is required"),
});

/* ---------- Types ---------- */
export type CategoryInput = z.infer<typeof categoryFormSchema>;
