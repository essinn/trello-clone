import { z } from "zod";
import { List } from "@/lib/generated/prisma";
import { updateListSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof updateListSchema>;
export type ReturnType = ActionState<InputType, List>;
