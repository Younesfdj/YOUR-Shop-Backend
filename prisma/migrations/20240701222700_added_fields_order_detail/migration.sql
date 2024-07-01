/*
  Warnings:

  - Added the required column `DetailProductName` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DetailProductPrice` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OrderSize` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderDetail" ADD COLUMN     "DetailProductName" TEXT NOT NULL,
ADD COLUMN     "DetailProductPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "OrderSize" TEXT NOT NULL;
