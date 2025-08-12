import { z } from "zod";
import { List } from "@/lib/generated/prisma";
import { updateListOrderSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof updateListOrderSchema>;
export type ReturnType = ActionState<InputType, List[]>;
