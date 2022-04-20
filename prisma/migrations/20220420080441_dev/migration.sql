-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userType" TEXT NOT NULL DEFAULT E'user1',
ALTER COLUMN "gameTokens" SET DEFAULT 1000;

-- CreateTable
CREATE TABLE "GameState" (
    "id" TEXT NOT NULL,
    "bDie_1" TEXT NOT NULL,
    "bDie_2" TEXT NOT NULL,
    "bDie_3" TEXT NOT NULL,
    "bScore" INTEGER NOT NULL,
    "pDie_1" TEXT NOT NULL,
    "pDie_2" TEXT NOT NULL,
    "pDie_3" TEXT NOT NULL,
    "pScore" INTEGER NOT NULL,
    "result" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "GameState_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameState" ADD CONSTRAINT "GameState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
