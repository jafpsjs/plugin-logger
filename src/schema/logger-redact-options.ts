import { Type } from "typebox";
import type { Static } from "typebox";

export const loggerRedactOptionsSchema = Type.Options(Type.Object({
  censor: Type.Optional(Type.String()),
  paths: Type.Array(Type.String()),
  remove: Type.Optional(Type.Boolean())
}), { additionalProperties: false });

/* node:coverage disable */
export type LoggerRedactOptions = Static<typeof loggerRedactOptionsSchema>;
