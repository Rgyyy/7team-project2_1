/*
  Warnings:

  - Added the required column `activityId` to the `MoimPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MoimPost" ADD COLUMN     "activityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MoimPost" ADD CONSTRAINT "MoimPost_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
