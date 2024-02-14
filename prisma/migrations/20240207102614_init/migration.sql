-- CreateTable
CREATE TABLE "Users" (
    "userid" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userid")
);
