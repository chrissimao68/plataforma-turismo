/*
  Warnings:

  - You are about to drop the column `slug` on the `PontoTuristico` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "PontoTuristico_slug_key";

-- AlterTable
ALTER TABLE "PontoTuristico" DROP COLUMN "slug";
