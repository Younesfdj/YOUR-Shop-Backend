import { PrismaClient } from "@prisma/client";
import { users } from "./data";

async function main(prisma: PrismaClient) {
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

export default main;
