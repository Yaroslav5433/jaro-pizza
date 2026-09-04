/*
  Warnings:

  - Changed the type of `verified` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verified",
ADD COLUMN     "verified" TIMESTAMP(3) NOT NULL;
