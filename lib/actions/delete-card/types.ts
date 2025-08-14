import { z } from "zod";
import { Card } from "@/lib/generated/prisma";
import { deleteCardSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof deleteCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
