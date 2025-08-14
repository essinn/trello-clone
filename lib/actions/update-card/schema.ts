import { z } from "zod";

export const updateCardSchema = z.object({
  boardId: z.string(),
  description: z
    .string({ message: "Description is required" })
    .min(3, { message: "Description is too short" })
    .optional(),
  title: z
    .string({
      message: "Title is required",
    })
    .min(3, {
      message: "Title is too short",
    })
    .optional(),
  id: z.string(),
});
