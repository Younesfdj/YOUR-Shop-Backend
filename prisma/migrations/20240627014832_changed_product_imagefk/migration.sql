-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_ProductImageId_fkey";

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("ProductId") ON DELETE RESTRICT ON UPDATE CASCADE;
