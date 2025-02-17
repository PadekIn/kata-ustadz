/*
  Warnings:

  - Changed the type of `ustadz_id` on the `contents` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "contents" DROP COLUMN "ustadz_id",
ADD COLUMN     "ustadz_id" INTEGER NOT NULL;
