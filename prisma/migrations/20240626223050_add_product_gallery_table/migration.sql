/*
  Warnings:

  - You are about to drop the column `ProductImagePath` on the `Product` table. All the data in the column will be lost.
  - Added the required column `ProductSizes` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "ProductImagePath",
ADD COLUMN     "ProductSizes" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProductImage" (
    "ProductImageId" SERIAL NOT NULL,
    "ProductImagePath" TEXT NOT NULL,
    "ProductId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("ProductImageId")
);

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_ProductImageId_fkey" FOREIGN KEY ("ProductImageId") REFERENCES "Product"("ProductId") ON DELETE RESTRICT ON UPDATE CASCADE;
