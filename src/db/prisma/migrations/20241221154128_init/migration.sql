-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'completed', 'failed');

-- CreateTable
CREATE TABLE "downloads" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID,
    "filename" TEXT,
    "space_url" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "downloads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "downloads_user_id_space_url_key" ON "downloads"("user_id", "space_url");
