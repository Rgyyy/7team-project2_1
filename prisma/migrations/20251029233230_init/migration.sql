-- CreateTable
CREATE TABLE "MoimPost" (
    "id" TEXT NOT NULL,
    "moimPostTitle" TEXT NOT NULL,
    "moimPostContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MoimPost_pkey" PRIMARY KEY ("id")
);
