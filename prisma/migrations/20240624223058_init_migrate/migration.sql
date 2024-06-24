-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'SHIPPING', 'DELIVERED');

-- CreateTable
CREATE TABLE "Product" (
    "ProductId" SERIAL NOT NULL,
    "ProductSKU" TEXT NOT NULL,
    "ProductName" TEXT NOT NULL,
    "ProductPrice" DOUBLE PRECISION NOT NULL,
    "ProductQuantity" INTEGER NOT NULL DEFAULT 1,
    "ProductCategoryId" INTEGER NOT NULL,
    "ProductDesc" TEXT NOT NULL,
    "ProductImagePath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("ProductId")
);

-- CreateTable
CREATE TABLE "Category" (
    "CategoryId" SERIAL NOT NULL,
    "CategoryName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("CategoryId")
);

-- CreateTable
CREATE TABLE "Order" (
    "OrderId" SERIAL NOT NULL,
    "OrderAmount" DOUBLE PRECISION NOT NULL,
    "OrderPhone" TEXT NOT NULL,
    "OrderEmail" TEXT NOT NULL,
    "OrderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "OrderWilaya" TEXT NOT NULL,
    "OrderCommune" TEXT NOT NULL,
    "OrderAdress" TEXT NOT NULL,
    "OrderStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("OrderId")
);

-- CreateTable
CREATE TABLE "OrderDetail" (
    "DetailId" SERIAL NOT NULL,
    "DetailOrderId" INTEGER NOT NULL,
    "DetailProductId" INTEGER NOT NULL,
    "DetailQuantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderDetail_pkey" PRIMARY KEY ("DetailId")
);

-- CreateTable
CREATE TABLE "User" (
    "UserId" SERIAL NOT NULL,
    "UserName" TEXT NOT NULL,
    "UserEmail" TEXT NOT NULL,
    "UserPassword" TEXT NOT NULL,
    "UserPhone" TEXT NOT NULL,
    "UserRole" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_ProductSKU_key" ON "Product"("ProductSKU");

-- CreateIndex
CREATE UNIQUE INDEX "User_UserEmail_key" ON "User"("UserEmail");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_ProductCategoryId_fkey" FOREIGN KEY ("ProductCategoryId") REFERENCES "Category"("CategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_DetailOrderId_fkey" FOREIGN KEY ("DetailOrderId") REFERENCES "Order"("OrderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_DetailProductId_fkey" FOREIGN KEY ("DetailProductId") REFERENCES "Product"("ProductId") ON DELETE RESTRICT ON UPDATE CASCADE;
