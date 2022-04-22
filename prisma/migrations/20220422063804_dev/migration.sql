/*
  Warnings:

  - You are about to drop the `GameState` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Home` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bDie_1` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bDie_2` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bDie_3` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bScore` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pDie_1` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pDie_2` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pDie_3` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pScore` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gameTokens` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "GameState" DROP CONSTRAINT "GameState_userId_fkey";

-- DropForeignKey
ALTER TABLE "Home" DROP CONSTRAINT "Home_ownerId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bDie_1" INTEGER NOT NULL,
ADD COLUMN     "bDie_2" INTEGER NOT NULL,
ADD COLUMN     "bDie_3" INTEGER NOT NULL,
ADD COLUMN     "bScore" INTEGER NOT NULL,
ADD COLUMN     "pDie_1" INTEGER NOT NULL,
ADD COLUMN     "pDie_2" INTEGER NOT NULL,
ADD COLUMN     "pDie_3" INTEGER NOT NULL,
ADD COLUMN     "pScore" INTEGER NOT NULL,
ADD COLUMN     "result" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "gameTokens" SET NOT NULL;

-- DropTable
DROP TABLE "GameState";

-- DropTable
DROP TABLE "Home";
