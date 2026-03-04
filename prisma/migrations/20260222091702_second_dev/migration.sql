/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `price` on the `OrderItem` table. All the data in the column will be lost.
  - Changed the type of `orederid` on the `GuestOrderInfo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `deliveryAddress` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `orderId` on the `OrderItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'DELIVERED';

-- DropForeignKey
ALTER TABLE "GuestOrderInfo" DROP CONSTRAINT "GuestOrderInfo_orederid_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- AlterTable
ALTER TABLE "GuestOrderInfo" DROP COLUMN "orederid",
ADD COLUMN     "orederid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "totalPrice" DROP NOT NULL,
ALTER COLUMN "deliveryAddress" SET NOT NULL,
ALTER COLUMN "guestInfo" DROP NOT NULL,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "price",
DROP COLUMN "orderId",
ADD COLUMN     "orderId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GuestOrderInfo_orederid_key" ON "GuestOrderInfo"("orederid");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestOrderInfo" ADD CONSTRAINT "GuestOrderInfo_orederid_fkey" FOREIGN KEY ("orederid") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
