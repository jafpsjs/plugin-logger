import { Type } from "typebox";
import type { Static } from "typebox";

export const logLevelSchema = Type.Enum(["fatal", "error", "warn", "info", "debug", "trace"]);

/* node:coverage disable */
export type LogLevel = Static<typeof logLevelSchema>;
