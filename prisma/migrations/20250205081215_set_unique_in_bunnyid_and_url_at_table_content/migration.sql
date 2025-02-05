/*
  Warnings:

  - A unique constraint covering the columns `[bunny_id]` on the table `contents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `contents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contents_bunny_id_key" ON "contents"("bunny_id");

-- CreateIndex
CREATE UNIQUE INDEX "contents_url_key" ON "contents"("url");
