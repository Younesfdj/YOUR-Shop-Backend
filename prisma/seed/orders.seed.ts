import { PrismaClient } from "@prisma/client";
import { orders } from "./data";

async function main(prisma: PrismaClient) {
  for (const order of orders) {
    await prisma.order.create({
      data: order,
    });
  }
}

export default main;
