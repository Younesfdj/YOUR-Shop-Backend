import { PrismaClient } from "@prisma/client";
import { productGallery } from "./data";

async function main(prisma: PrismaClient) {
  for (const productImage of productGallery) {
    await prisma.productImage.create({
      data: {
        ProductImagePath: productImage.ProductImagePath,
        Product: {
          connect: {
            ProductId: productImage.ProductId,
          },
        },
      },
    });
  }
}

export default main;
