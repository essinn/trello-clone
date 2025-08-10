import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      error: "Title is required",
    })
    .min(3, {
      message: "Title must be at least 3 characters long",
    }),
  image: z.string({
    error: "Image is required",
  }),
});
