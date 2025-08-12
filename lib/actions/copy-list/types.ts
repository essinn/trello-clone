import { z } from "zod";
import { List } from "@/lib/generated/prisma";
import { copyListSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof copyListSchema>;
export type ReturnType = ActionState<InputType, List>;
