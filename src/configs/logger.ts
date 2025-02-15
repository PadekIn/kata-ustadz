import { PinoLoggerOptions } from "fastify/types/logger";
import env from "./env";
import pino from "pino";

const environmentConfigs = {
  development: {
    level: "debug",
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
        colorize: true,
      },
    },
  },
  production: {
    level: "info",
    redact: ["req.headers.authorization"], // Hide sensitive info
    formatters: {
      level(label: string) {
        return { level: label };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    destination: pino.destination({ dest: "./src/logs/app.log", sync: false }),
  },
};

function getConfig(): PinoLoggerOptions | boolean {
  switch (env.NODE_ENV) {
    case "development":
      return environmentConfigs.development;
    case "production":
      return environmentConfigs.production;
    default:
      return false;
  }
}

export default getConfig();
