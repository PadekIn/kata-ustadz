/*
  Warnings:

  - You are about to drop the column `is_delete` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `is_delete` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the column `is_delete` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `is_delete` on the `package` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "is_delete";

-- AlterTable
ALTER TABLE "contents" DROP COLUMN "is_delete";

-- AlterTable
ALTER TABLE "modules" DROP COLUMN "is_delete";

-- AlterTable
ALTER TABLE "package" DROP COLUMN "is_delete";
