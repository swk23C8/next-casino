/*
  Warnings:

  - The primary key for the `GameState` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `GameState` table. All the data in the column will be lost.
  - The required column `gameId` was added to the `GameState` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "GameState" DROP CONSTRAINT "GameState_pkey",
DROP COLUMN "id",
ADD COLUMN     "gameId" TEXT NOT NULL,
ADD CONSTRAINT "GameState_pkey" PRIMARY KEY ("gameId");
