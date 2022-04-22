/*
  Warnings:

  - You are about to drop the column `bDie_1` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bDie_2` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bDie_3` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bScore` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pDie_1` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pDie_2` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pDie_3` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pScore` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "bDie_1",
DROP COLUMN "bDie_2",
DROP COLUMN "bDie_3",
DROP COLUMN "bScore",
DROP COLUMN "pDie_1",
DROP COLUMN "pDie_2",
DROP COLUMN "pDie_3",
DROP COLUMN "pScore",
DROP COLUMN "result",
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "gameTokens" DROP NOT NULL;

-- CreateTable
CREATE TABLE "GameState" (
    "id" TEXT NOT NULL,
    "bDie_1" INTEGER NOT NULL,
    "bDie_2" INTEGER NOT NULL,
    "bDie_3" INTEGER NOT NULL,
    "bScore" INTEGER NOT NULL,
    "pDie_1" INTEGER NOT NULL,
    "pDie_2" INTEGER NOT NULL,
    "pDie_3" INTEGER NOT NULL,
    "pScore" INTEGER NOT NULL,
    "result" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GameState_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameState" ADD CONSTRAINT "GameState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
