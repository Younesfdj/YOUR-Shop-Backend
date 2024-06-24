import { PrismaClient } from "@prisma/client";
import { productCategories } from "./data";

async function main(prisma: PrismaClient) {
  for (const category of productCategories) {
    await prisma.category.create({
      data: category,
    });
  }
}

export default main;
