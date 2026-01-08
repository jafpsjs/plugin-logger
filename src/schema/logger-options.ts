import { Type } from "typebox";
import { logLevelSchema } from "./log-level.js";
import { loggerRedactOptionsSchema } from "./logger-redact-options.js";
import type { Static } from "typebox";

export const loggerOptionsSchema = Type.Options(Type.Object({
  logLevel: logLevelSchema,
  msgPrefix: Type.Optional(Type.String()),
  redact: Type.Optional(Type.Union([Type.Array(Type.String()), loggerRedactOptionsSchema]))
}), { additionalProperties: false });

/* node:coverage disable */
export type LoggerOptions = Static<typeof loggerOptionsSchema>;
