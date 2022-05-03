/*
  Warnings:

  - Changed the type of `bDie_1` on the `GameState` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bDie_2` on the `GameState` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bDie_3` on the `GameState` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pDie_1` on the `GameState` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pDie_2` on the `GameState` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pDie_3` on the `GameState` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GameState" DROP COLUMN "bDie_1",
ADD COLUMN     "bDie_1" INTEGER NOT NULL,
DROP COLUMN "bDie_2",
ADD COLUMN     "bDie_2" INTEGER NOT NULL,
DROP COLUMN "bDie_3",
ADD COLUMN     "bDie_3" INTEGER NOT NULL,
DROP COLUMN "pDie_1",
ADD COLUMN     "pDie_1" INTEGER NOT NULL,
DROP COLUMN "pDie_2",
ADD COLUMN     "pDie_2" INTEGER NOT NULL,
DROP COLUMN "pDie_3",
ADD COLUMN     "pDie_3" INTEGER NOT NULL;
