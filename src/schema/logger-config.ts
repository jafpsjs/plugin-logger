import { Type } from "typebox";
import { loggerOptionsSchema } from "./logger-options.js";
import type { Static } from "typebox";

export const loggerConfigSchema = Type.Options(Type.Record(
  Type.String(),
  loggerOptionsSchema
), { additionalProperties: false });

/* node:coverage disable */
export type LoggerConfig = Static<typeof loggerConfigSchema>;
