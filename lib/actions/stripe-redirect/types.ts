import { z } from "zod";
import { stripeRedirectSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof stripeRedirectSchema>;
export type ReturnType = ActionState<InputType, string>;
