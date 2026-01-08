import assert from "node:assert/strict";
import { describe, it } from "node:test";
import fastify from "fastify";
import plugin from "../index.js";

describe("@jafps/plugin-logger", () => {
  describe("logFor", () => {
    it("should create logger", async () => {
      const app = await fastify();
      await app.register(plugin, { config: {} });
      const result = app.logFor("a");
      assert.ok(result);
    });
  });
});
