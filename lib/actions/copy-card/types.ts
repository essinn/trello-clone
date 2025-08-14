import { z } from "zod";
import { Card } from "@/lib/generated/prisma";
import { copyCardSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof copyCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
