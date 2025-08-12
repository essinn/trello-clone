import { z } from "zod";
import { Card } from "@/lib/generated/prisma";
import { createCardSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof createCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
