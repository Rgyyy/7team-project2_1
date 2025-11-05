-- CreateTable
CREATE TABLE "user_data" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_state" TEXT NOT NULL DEFAULT '0',
    "user_main_location" TEXT,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,

    CONSTRAINT "user_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login_record" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "login_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "login_location" TEXT,
    "login_ip" TEXT,
    "login_platform" TEXT,

    CONSTRAINT "login_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "maxParticipants" INTEGER NOT NULL,
    "participants" INTEGER NOT NULL DEFAULT 0,
    "difficultyLevel" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "organizer" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Participation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_data_user_id_key" ON "user_data"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_data_user_name_key" ON "user_data"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_data_user_email_key" ON "user_data"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE INDEX "Activity_categoryId_idx" ON "Activity"("categoryId");

-- CreateIndex
CREATE INDEX "Activity_locationId_idx" ON "Activity"("locationId");

-- CreateIndex
CREATE INDEX "Activity_userId_idx" ON "Activity"("userId");

-- CreateIndex
CREATE INDEX "Participation_activityId_idx" ON "Participation"("activityId");

-- CreateIndex
CREATE INDEX "Participation_userId_idx" ON "Participation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Participation_activityId_userId_key" ON "Participation"("activityId", "userId");

-- AddForeignKey
ALTER TABLE "login_record" ADD CONSTRAINT "login_record_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_data"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;
