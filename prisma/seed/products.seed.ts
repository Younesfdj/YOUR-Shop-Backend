import { PrismaClient } from "@prisma/client";
import { products } from "./data";

async function main(prisma: PrismaClient) {
  for (const product of products) {
    await prisma.product.create({
      data: {
        ProductName: product.ProductName,
        ProductDesc: product.ProductDesc,
        ProductPrice: product.ProductPrice,
        ProductImagePath: product.ProductImagePath,
        ProductQuantity: product.ProductQuantity,
        ProductSKU: product.ProductSKU,
        Category: {
          connect: {
            CategoryId: product.ProductCategoryId,
          },
        },
      },
    });
  }
}

export default main;
