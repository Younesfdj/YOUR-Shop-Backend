import { PrismaClient } from "@prisma/client";
import categorySeed from "./category.seed";
import productSeed from "./products.seed";
import ordersSeed from "./orders.seed";
import orderDetail from "./orderDetails.seed";
import usersSeed from "./users.seed";
import { log } from "../../src/utils/logger";
const seedFunctions = [usersSeed, categorySeed, productSeed];

const prisma = new PrismaClient();
async function main() {
  const seedPromises = seedFunctions.map((seedFunction) => {
    return seedFunction(prisma);
  });
  return Promise.all(seedPromises);
}

main()
  .then(() => {
    log.info("Seed data inserted successfully");
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1);
  });

// js is beautiful *-*
