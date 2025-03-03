/*
  Warnings:

  - You are about to drop the column `code` on the `Country` table. All the data in the column will be lost.
  - You are about to alter the column `rating` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `businessHours` on the `Workspace` table. All the data in the column will be lost.
  - You are about to drop the column `contacts` on the `Workspace` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Workspace` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locationId]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Made the column `website` on table `Workspace` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Workspace` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Country_code_key";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "building" TEXT,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "floorNumber" TEXT,
ADD COLUMN     "officeNumber" TEXT;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "rating" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "businessHours",
DROP COLUMN "contacts",
DROP COLUMN "phone",
ALTER COLUMN "website" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_locationId_key" ON "Workspace"("locationId");
