import type { registerUserConfirmQuerySchema } from "@/modules/v1/public/register";
import type { z } from "zod";

export type AuthUserQueryType = {
  local?: string;
};

export type RegisterConfirmQueryType = z.infer<typeof registerUserConfirmQuerySchema>;
