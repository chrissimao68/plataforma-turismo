/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Administrador` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Administrador" DROP COLUMN "createdAt",
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
