/*
  Warnings:

  - You are about to drop the column `OrderAdress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `OrderEmail` on the `Order` table. All the data in the column will be lost.
  - Added the required column `OrderFName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OrderLName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OrderShippingMode` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderShippingMode" AS ENUM ('AGENCY', 'HAND');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "OrderAdress",
DROP COLUMN "OrderEmail",
ADD COLUMN     "OrderFName" TEXT NOT NULL,
ADD COLUMN     "OrderLName" TEXT NOT NULL,
ADD COLUMN     "OrderShippingMode" "OrderShippingMode" NOT NULL;
