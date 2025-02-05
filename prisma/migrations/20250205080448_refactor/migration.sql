/*
  Warnings:

  - The values [male,female] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [Promosi,Notifikasi] on the enum `MessageType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `is_active` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `id_content` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `contents` table. All the data in the column will be lost.
  - The `type` column on the `contents` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `id_content` on the `histories` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `histories` table. All the data in the column will be lost.
  - You are about to drop the column `id_content` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `likes` table. All the data in the column will be lost.
  - The primary key for the `list_contents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `create_by` on the `list_contents` table. All the data in the column will be lost.
  - You are about to drop the column `id_category` on the `list_contents` table. All the data in the column will be lost.
  - You are about to drop the column `id_content` on the `list_contents` table. All the data in the column will be lost.
  - The primary key for the `list_modules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_content` on the `list_modules` table. All the data in the column will be lost.
  - You are about to drop the column `id_module` on the `list_modules` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `id_content` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `id_packet` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `subscription` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `package` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bunny_id` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ustadz_name` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_id` to the `histories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `histories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_id` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `list_contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_id` to the `list_contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_id` to the `list_modules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `module_id` to the `list_modules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderStatus` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `fullname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `watch_laters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('Audio', 'Video', 'Pdf');

-- CreateEnum
CREATE TYPE "WatchType" AS ENUM ('Content', 'Module');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('Content', 'Packet');

-- CreateEnum
CREATE TYPE "CommissionStatus" AS ENUM ('Pending', 'Paid');

-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('Male', 'Female');
ALTER TABLE "users" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "MessageType_new" AS ENUM ('Promotion', 'Notification');
ALTER TABLE "notifications" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "notifications" ALTER COLUMN "type" TYPE "MessageType_new" USING ("type"::text::"MessageType_new");
ALTER TYPE "MessageType" RENAME TO "MessageType_old";
ALTER TYPE "MessageType_new" RENAME TO "MessageType";
DROP TYPE "MessageType_old";
ALTER TABLE "notifications" ALTER COLUMN "type" SET DEFAULT 'Promotion';
COMMIT;

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_id_content_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_id_user_fkey";

-- DropForeignKey
ALTER TABLE "histories" DROP CONSTRAINT "histories_id_content_fkey";

-- DropForeignKey
ALTER TABLE "histories" DROP CONSTRAINT "histories_id_user_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_id_content_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_id_user_fkey";

-- DropForeignKey
ALTER TABLE "list_contents" DROP CONSTRAINT "list_contents_create_by_fkey";

-- DropForeignKey
ALTER TABLE "list_contents" DROP CONSTRAINT "list_contents_id_category_fkey";

-- DropForeignKey
ALTER TABLE "list_contents" DROP CONSTRAINT "list_contents_id_content_fkey";

-- DropForeignKey
ALTER TABLE "list_modules" DROP CONSTRAINT "list_modules_id_content_fkey";

-- DropForeignKey
ALTER TABLE "list_modules" DROP CONSTRAINT "list_modules_id_module_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_id_content_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_id_packet_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_id_user_fkey";

-- DropIndex
DROP INDEX "users_full_name_key";

-- DropIndex
DROP INDEX "users_phone_number_key";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "is_active";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "comment",
DROP COLUMN "id_content",
DROP COLUMN "id_user",
ADD COLUMN     "content_id" INTEGER NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "contents" DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "link",
DROP COLUMN "title",
ADD COLUMN     "bunny_id" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "ustadz_name" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "ContentType" NOT NULL DEFAULT 'Video';

-- AlterTable
ALTER TABLE "histories" DROP COLUMN "id_content",
DROP COLUMN "id_user",
ADD COLUMN     "content_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "id_content",
DROP COLUMN "id_user",
ADD COLUMN     "content_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "list_contents" DROP CONSTRAINT "list_contents_pkey",
DROP COLUMN "create_by",
DROP COLUMN "id_category",
DROP COLUMN "id_content",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "content_id" INTEGER NOT NULL,
ADD CONSTRAINT "list_contents_pkey" PRIMARY KEY ("content_id", "category_id");

-- AlterTable
ALTER TABLE "list_modules" DROP CONSTRAINT "list_modules_pkey",
DROP COLUMN "id_content",
DROP COLUMN "id_module",
ADD COLUMN     "content_id" INTEGER NOT NULL,
ADD COLUMN     "module_id" INTEGER NOT NULL,
ADD CONSTRAINT "list_modules_pkey" PRIMARY KEY ("module_id", "content_id");

-- AlterTable
ALTER TABLE "modules" DROP COLUMN "title";

-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "type" SET DEFAULT 'Promotion';

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "id_content",
DROP COLUMN "id_packet",
DROP COLUMN "id_user",
DROP COLUMN "status",
ADD COLUMN     "affiliate_id" INTEGER,
ADD COLUMN     "content_id" INTEGER,
ADD COLUMN     "orderStatus" "OrderStatus" NOT NULL,
ADD COLUMN     "packet_id" INTEGER,
ADD COLUMN     "user_id" INTEGER NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "OrderType" NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "full_name",
DROP COLUMN "phone_number",
DROP COLUMN "subscription",
ADD COLUMN     "fullname" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "watch_laters" DROP COLUMN "type",
ADD COLUMN     "type" "WatchType" NOT NULL;

-- DropTable
DROP TABLE "package";

-- DropEnum
DROP TYPE "TypeContent";

-- DropEnum
DROP TYPE "TypeOrder";

-- DropEnum
DROP TYPE "TypeWatchLater";

-- CreateTable
CREATE TABLE "affiliates" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "referral_code" TEXT NOT NULL,
    "total_earning" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_payout" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "affiliates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "packets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commissions" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "affiliate_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "CommissionStatus" NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "affiliates_user_id_key" ON "affiliates"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "affiliates_referral_code_key" ON "affiliates"("referral_code");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "affiliates" ADD CONSTRAINT "affiliates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_contents" ADD CONSTRAINT "list_contents_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_contents" ADD CONSTRAINT "list_contents_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_modules" ADD CONSTRAINT "list_modules_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_modules" ADD CONSTRAINT "list_modules_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_packet_id_fkey" FOREIGN KEY ("packet_id") REFERENCES "packets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_affiliate_id_fkey" FOREIGN KEY ("affiliate_id") REFERENCES "affiliates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commissions" ADD CONSTRAINT "commissions_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commissions" ADD CONSTRAINT "commissions_affiliate_id_fkey" FOREIGN KEY ("affiliate_id") REFERENCES "affiliates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
