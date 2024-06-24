import { PrismaClient } from "@prisma/client";
import { log } from "../utils/logger";
export const prismaClient = new PrismaClient({
  log: [{ level: "info", emit: "event" }],
  errorFormat: "pretty",
});

prismaClient.$connect().then(() => {
  log.info("Connected to Postgres Database");
});
