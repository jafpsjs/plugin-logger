import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Check } from "typebox/value";
import { loggerConfigSchema } from "../logger-config.js";
import type { LoggerConfig } from "../logger-config.js";

describe("loggerConfigSchema", () => {
  it("should return true for valid config", async () => {
    const value: LoggerConfig = {
      a: { logLevel: "error" },
      "b.c": {
        logLevel: "debug",
        msgPrefix: "[Prefix]",
        redact: ["a"]
      }
    };
    assert.equal(Check(loggerConfigSchema, value), true);
  });
});
