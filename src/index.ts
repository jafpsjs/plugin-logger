import fp from "fastify-plugin";
import { resolveLoggerOptions } from "./resolve-logger-options.js";
import type { FastifyBaseLogger } from "fastify";
import type { LoggerConfig } from "#schema";

const configSymbol = Symbol("LoggerConfig");

export type LoggerPluginOptions = {
  config: LoggerConfig;
};

export const name = "@jafps/plugin-logger";

export default fp<LoggerPluginOptions>(
  async (app, opts) => {
    const { config } = opts;
    app.decorate(configSymbol, config);
    app.decorate("logFor", function (this, module, components = []) {
      const paths = [module, ...components].join(".");
      const opts = resolveLoggerOptions(this[configSymbol], paths);
      return app.log.child({ _meta: { module, paths } }, opts);
    });
  },
  {
    decorators: {},
    dependencies: [],
    fastify: "5.x",
    name
  }
);

/* node:coverage disable */
declare module "fastify" {
  interface FastifyInstance {
    readonly [configSymbol]: LoggerConfig;
    logFor: (module: string, components?: string[]) => FastifyBaseLogger;
  }
}

declare module "pino" {
  interface LogFnFields {
    _meta: {
      module: string;
      paths: string;
    };
    err?: Error;
  }
}
