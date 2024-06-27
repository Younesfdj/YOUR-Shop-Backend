import { PrismaClient } from "@prisma/client";
import categorySeed from "./category.seed";
import productSeed from "./products.seed";
import productGallerySeed from "./productGallery.seed";
// import ordersSeed from "./orders.seed";
// import orderDetail from "./orderDetails.seed";
import usersSeed from "./users.seed";
import { log } from "../../src/utils/logger";
const seedFunctions = [
  usersSeed,
  categorySeed,
  productSeed,
  productGallerySeed,
];

const prisma = new PrismaClient();
async function main() {
  for (const seedFunction of seedFunctions) {
    await seedFunction(prisma);
  }
  log.info("Seeding completed successfully!");
  await prisma.$disconnect();
}

main();
