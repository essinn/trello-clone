import { z } from "zod";
import { Card } from "@/lib/generated/prisma";
import { updateCardOrderSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof updateCardOrderSchema>;
export type ReturnType = ActionState<InputType, Card[]>;
