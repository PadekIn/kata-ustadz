/*
  Warnings:

  - You are about to drop the column `user_id` on the `affiliates` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `ustadz_name` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `histories` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `notifications` table. All the data in the column will be lost.
  - The `type` column on the `notifications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `detailPrice` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `orderStatus` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `payment_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `orders` table. All the data in the column will be lost.
  - The `status` column on the `payments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `id_user` on the `purchased_contents` table. All the data in the column will be lost.
  - You are about to drop the column `id_content` on the `watch_laters` table. All the data in the column will be lost.
  - You are about to drop the column `id_module` on the `watch_laters` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `watch_laters` table. All the data in the column will be lost.
  - You are about to drop the `list_modules` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[account_id]` on the table `affiliates` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account_id` to the `affiliates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ustadz_id` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `histories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detail_price` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_account` to the `purchased_contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `watch_laters` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Settlement', 'Capture', 'Failed', 'Expired', 'Cancelled');

-- DropForeignKey
ALTER TABLE "affiliates" DROP CONSTRAINT "affiliates_user_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_create_by_fkey";

-- DropForeignKey
ALTER TABLE "histories" DROP CONSTRAINT "histories_user_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "list_modules" DROP CONSTRAINT "list_modules_content_id_fkey";

-- DropForeignKey
ALTER TABLE "list_modules" DROP CONSTRAINT "list_modules_create_by_fkey";

-- DropForeignKey
ALTER TABLE "list_modules" DROP CONSTRAINT "list_modules_module_id_fkey";

-- DropForeignKey
ALTER TABLE "modules" DROP CONSTRAINT "modules_create_by_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_packet_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- DropForeignKey
ALTER TABLE "purchased_contents" DROP CONSTRAINT "purchased_contents_id_user_fkey";

-- DropForeignKey
ALTER TABLE "watch_laters" DROP CONSTRAINT "watch_laters_id_content_fkey";

-- DropForeignKey
ALTER TABLE "watch_laters" DROP CONSTRAINT "watch_laters_id_module_fkey";

-- DropForeignKey
ALTER TABLE "watch_laters" DROP CONSTRAINT "watch_laters_id_user_fkey";

-- DropIndex
DROP INDEX "affiliates_user_id_key";

-- AlterTable
ALTER TABLE "affiliates" DROP COLUMN "user_id",
ADD COLUMN     "account_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "user_id",
ADD COLUMN     "account_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "contents" DROP COLUMN "ustadz_name",
ADD COLUMN     "ustadz_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "histories" DROP COLUMN "user_id",
ADD COLUMN     "account_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "user_id",
ADD COLUMN     "account_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "description",
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'General';

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "detailPrice",
DROP COLUMN "orderStatus",
DROP COLUMN "payment_id",
DROP COLUMN "user_id",
ADD COLUMN     "account_id" INTEGER NOT NULL,
ADD COLUMN     "detail_price" JSONB NOT NULL,
ADD COLUMN     "order_status" "OrderStatus" NOT NULL DEFAULT 'Unpaid';

-- AlterTable
ALTER TABLE "packets" ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "status",
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'Pending',
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "purchased_contents" DROP COLUMN "id_user",
ADD COLUMN     "id_account" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "watch_laters" DROP COLUMN "id_content",
DROP COLUMN "id_module",
DROP COLUMN "id_user",
ADD COLUMN     "account_id" INTEGER NOT NULL,
ADD COLUMN     "content_id" INTEGER,
ADD COLUMN     "module_id" INTEGER;

-- DropTable
DROP TABLE "list_modules";

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "fullname" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "phone" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ustadz" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "phone" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ustadz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module_contents" (
    "module_id" INTEGER NOT NULL,
    "content_id" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "create_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "module_contents_pkey" PRIMARY KEY ("module_id","content_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_account_id_key" ON "admins"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "admins_phone_key" ON "admins"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "ustadz_phone_key" ON "ustadz"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "affiliates_account_id_key" ON "affiliates"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_order_id_key" ON "payments"("order_id");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliates" ADD CONSTRAINT "affiliates_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_create_by_fkey" FOREIGN KEY ("create_by") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_create_by_fkey" FOREIGN KEY ("create_by") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_contents" ADD CONSTRAINT "module_contents_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_contents" ADD CONSTRAINT "module_contents_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_contents" ADD CONSTRAINT "module_contents_create_by_fkey" FOREIGN KEY ("create_by") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch_laters" ADD CONSTRAINT "watch_laters_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch_laters" ADD CONSTRAINT "watch_laters_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch_laters" ADD CONSTRAINT "watch_laters_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchased_contents" ADD CONSTRAINT "purchased_contents_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_packet_id_fkey" FOREIGN KEY ("packet_id") REFERENCES "packets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
