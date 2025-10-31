/*
  Warnings:

  - Added the required column `moimPostCat` to the `MoimPost` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MoimPostCat" AS ENUM ('전체', '모임후기', '가입인사', '자유', '공지');

-- AlterTable
ALTER TABLE "MoimPost" ADD COLUMN     "moimPostCat" "MoimPostCat" NOT NULL;
