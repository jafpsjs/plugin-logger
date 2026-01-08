import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resolveLoggerOptions } from "../resolve-logger-options.js";
import type { LoggerConfig } from "#schema";

describe("resolveLoggerOptions", () => {
  it("should return config for exact key", async () => {
    const value: LoggerConfig = {
      a: { logLevel: "error" },
      "b.c": {
        logLevel: "debug",
        msgPrefix: "[Prefix]",
        redact: ["a"]
      }
    };
    const cfg = resolveLoggerOptions(value, "a");
    assert.ok(cfg);
    assert.equal(cfg.logLevel, "error");
    assert.equal(cfg.msgPrefix, undefined);
    assert.equal(cfg.redact, undefined);
  });

  it("should return config for parent key", async () => {
    const value: LoggerConfig = {
      a: { logLevel: "error" },
      "b.c": {
        logLevel: "debug",
        msgPrefix: "[Prefix]",
        redact: ["a"]
      }
    };
    const cfg = resolveLoggerOptions(value, "a.b.c");
    assert.ok(cfg);
    assert.equal(cfg.logLevel, "error");
    assert.equal(cfg.msgPrefix, undefined);
    assert.equal(cfg.redact, undefined);
  });

  it("should return config for exact dot key", async () => {
    const value: LoggerConfig = {
      b: { logLevel: "error" },
      "b.c": {
        logLevel: "debug",
        msgPrefix: "[Prefix]",
        redact: ["a"]
      }
    };
    const cfg = resolveLoggerOptions(value, "b.c");
    assert.ok(cfg);
    assert.equal(cfg.logLevel, "debug");
    assert.equal(cfg.msgPrefix, "[Prefix]");
    assert.deepStrictEqual(cfg.redact, ["a"]);
  });

  it("should return undefined for missing key", async () => {
    const value: LoggerConfig = {
      a: { logLevel: "error" },
      "b.c": {
        logLevel: "debug",
        msgPrefix: "[Prefix]",
        redact: ["a"]
      }
    };
    const cfg = resolveLoggerOptions(value, "d");
    assert.equal(cfg, undefined);
  });
});
