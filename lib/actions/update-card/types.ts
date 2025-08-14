import { z } from "zod";
import { Card } from "@/lib/generated/prisma";
import { updateCardSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof updateCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
