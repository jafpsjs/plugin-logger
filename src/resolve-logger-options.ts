/* node:coverage disable */
import type { LoggerConfig } from "./schema/logger-config.js";
import type { LoggerOptions } from "./schema/logger-options.js";

/* node:coverage enable */

export function resolveLoggerOptions(cfg: LoggerConfig, key: string): LoggerOptions | undefined {
  if (key in cfg) {
    return cfg[key];
  }
  const keys = key.split(".");
  keys.pop();
  while (keys.length >= 1) {
    const parentKey = keys.join(".");
    if (parentKey in cfg) {
      return cfg[parentKey];
    }
    keys.pop();
  }
  return undefined;
}
