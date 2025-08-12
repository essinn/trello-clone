import { z } from "zod";
import { List } from "@/lib/generated/prisma";
import { createListSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof createListSchema>;
export type ReturnType = ActionState<InputType, List>;
