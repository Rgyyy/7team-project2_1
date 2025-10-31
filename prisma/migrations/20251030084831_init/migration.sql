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

-- CreateIndex
CREATE UNIQUE INDEX "user_data_user_id_key" ON "user_data"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_data_user_name_key" ON "user_data"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_data_user_email_key" ON "user_data"("user_email");

-- AddForeignKey
ALTER TABLE "login_record" ADD CONSTRAINT "login_record_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_data"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
