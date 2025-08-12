import { z } from "zod";
import { List } from "@/lib/generated/prisma";
import { deleteListSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof deleteListSchema>;
export type ReturnType = ActionState<InputType, List>;
