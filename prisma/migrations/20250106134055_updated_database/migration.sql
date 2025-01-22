/*
  Warnings:

  - You are about to alter the column `amount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(10,2)`.
  - You are about to alter the column `due_amount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(10,2)`.
  - You are about to alter the column `balance` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(10,2)`.
  - You are about to alter the column `price` on the `Subjects` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(5,2)`.
  - You are about to alter the column `commission_amount` on the `TeacherCommission` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(5,2)`.
  - A unique constraint covering the columns `[username]` on the table `Parents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Parents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subject_name]` on the table `Subjects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Teachers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `Teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Parents` table without a default value. This is not possible if the table is not empty.
  - Made the column `first_name` on table `Parents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `surname` on table `Parents` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `sex` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Made the column `price` on table `Subjects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `first_name` on table `Teachers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `surname` on table `Teachers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `Teachers` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserSex" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Parents" ADD COLUMN "email" TEXT,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "first_name" SET DATA TYPE TEXT,
ALTER COLUMN "surname" SET NOT NULL,
ALTER COLUMN "surname" SET DATA TYPE TEXT,
ALTER COLUMN "phone_number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "due_amount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Students" ADD COLUMN "email" TEXT,
ADD COLUMN     "sex" "UserSex" NOT NULL,
ALTER COLUMN "username" SET DATA TYPE TEXT,
ALTER COLUMN "first_name" SET DATA TYPE TEXT,
ALTER COLUMN "last_name" SET DATA TYPE TEXT,
ALTER COLUMN "phone_number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Subjects" ALTER COLUMN "subject_name" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "TeacherCommission" ALTER COLUMN "commission_amount" SET DATA TYPE DECIMAL(5,2),
ALTER COLUMN "commission_type" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Teachers" ADD COLUMN "email" TEXT,
ALTER COLUMN "username" SET DATA TYPE TEXT,
ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "first_name" SET DATA TYPE TEXT,
ALTER COLUMN "surname" SET NOT NULL,
ALTER COLUMN "surname" SET DATA TYPE TEXT,
ALTER COLUMN "phone_number" SET NOT NULL,
ALTER COLUMN "phone_number" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Parents_username_key" ON "Parents"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Parents_email_key" ON "Parents"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Students_username_key" ON "Students"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Students_email_key" ON "Students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subjects_subject_name_key" ON "Subjects"("subject_name");

-- CreateIndex
CREATE UNIQUE INDEX "Teachers_email_key" ON "Teachers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teachers_phone_number_key" ON "Teachers"("phone_number");
