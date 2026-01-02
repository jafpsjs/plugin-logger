import fp from "fastify-plugin";
import type {} from "fastify";


export type LoggerPluginOptions = {
  value: string;
};

export const name = "@jafps/plugin-logger";

export default fp<LoggerPluginOptions>(
  async (app, opts) => {
    const { value } = opts;
    app.decorate("hello", () => value);
  },
  {
    decorators: {},
    dependencies: [],
    fastify: "5.x",
    name
  }
);

declare module "fastify" {
  interface FastifyInstance {
    readonly hello: () => string;
  }
}

declare module "pino" {
  interface LogFnFields {
    err?: Error;
  }
}
