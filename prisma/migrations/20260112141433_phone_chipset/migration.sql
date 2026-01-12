/*
  Warnings:

  - Added the required column `chipset` to the `Phone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Phone" ADD COLUMN     "chipset" TEXT NOT NULL;
