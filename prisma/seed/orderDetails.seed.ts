import { PrismaClient } from "@prisma/client";
import { orderDetails } from "./data";

async function main(prisma: PrismaClient) {
  for (const orderDetail of orderDetails) {
    await prisma.orderDetail.create({
      data: orderDetail,
    });
  }
}

export default main;
