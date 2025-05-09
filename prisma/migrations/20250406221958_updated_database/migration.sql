/*
  Warnings:

  - The primary key for the `Students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Subjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `teacher_id` on the `Subjects` table. All the data in the column will be lost.
  - The primary key for the `Teachers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentParent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentSubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherCommission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `grade_id` to the `Subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_portion` to the `Subjects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_student_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentParent" DROP CONSTRAINT "StudentParent_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentParent" DROP CONSTRAINT "StudentParent_student_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentSubject" DROP CONSTRAINT "StudentSubject_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_grade_id_fkey";

-- DropForeignKey
ALTER TABLE "Subjects" DROP CONSTRAINT "Subjects_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "TeacherCommission" DROP CONSTRAINT "TeacherCommission_teacher_id_fkey";

-- DropIndex
DROP INDEX "Subjects_subject_name_key";

-- AlterTable
ALTER TABLE "Students" DROP CONSTRAINT "Students_pkey",
ADD COLUMN     "profile_img" TEXT,
ALTER COLUMN "student_id" DROP DEFAULT,
ALTER COLUMN "student_id" SET DATA TYPE TEXT,
ALTER COLUMN "phone_number" DROP NOT NULL,
ADD CONSTRAINT "Students_pkey" PRIMARY KEY ("student_id");
DROP SEQUENCE "Students_student_id_seq";

-- AlterTable
ALTER TABLE "Subjects" DROP CONSTRAINT "Subjects_pkey",
DROP COLUMN "teacher_id",
ADD COLUMN     "grade_id" TEXT NOT NULL,
ADD COLUMN     "teacher_portion" DECIMAL(5,2) NOT NULL,
ALTER COLUMN "subject_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Subjects_pkey" PRIMARY KEY ("subject_id");

-- AlterTable
ALTER TABLE "Teachers" DROP CONSTRAINT "Teachers_pkey",
ADD COLUMN     "profile_img" TEXT,
ALTER COLUMN "teacher_id" DROP DEFAULT,
ALTER COLUMN "teacher_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Teachers_pkey" PRIMARY KEY ("teacher_id");
DROP SEQUENCE "Teachers_teacher_id_seq";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Attendance";

-- DropTable
DROP TABLE "Parents";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "StudentParent";

-- DropTable
DROP TABLE "StudentSubject";

-- DropTable
DROP TABLE "TeacherCommission";

-- CreateTable
CREATE TABLE "StudentSubjects" (
    "subject_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "enrollment_date" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "StudentSubjects_pkey" PRIMARY KEY ("student_id","subject_id")
);

-- CreateTable
CREATE TABLE "TeacherSubjects" (
    "teacher_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "assigned_date" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TeacherSubjects_pkey" PRIMARY KEY ("teacher_id","subject_id")
);

-- CreateTable
CREATE TABLE "StudentPayments" (
    "payment_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(5,2) NOT NULL,
    "month_id" TEXT NOT NULL,

    CONSTRAINT "StudentPayments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "TeacherPayments" (
    "payment_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "month_id" TEXT NOT NULL,

    CONSTRAINT "TeacherPayments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "Months" (
    "month_id" TEXT NOT NULL,

    CONSTRAINT "Months_pkey" PRIMARY KEY ("month_id")
);

-- AddForeignKey
ALTER TABLE "Subjects" ADD CONSTRAINT "Subjects_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "Grades"("grade_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "Grades"("grade_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSubjects" ADD CONSTRAINT "StudentSubjects_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("student_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSubjects" ADD CONSTRAINT "StudentSubjects_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("subject_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TeacherSubjects" ADD CONSTRAINT "TeacherSubjects_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("teacher_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherSubjects" ADD CONSTRAINT "TeacherSubjects_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("subject_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "StudentPayments" ADD CONSTRAINT "StudentPayments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("student_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPayments" ADD CONSTRAINT "StudentPayments_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("subject_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "StudentPayments" ADD CONSTRAINT "StudentPayments_month_id_fkey" FOREIGN KEY ("month_id") REFERENCES "Months"("month_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TeacherPayments" ADD CONSTRAINT "TeacherPayments_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("teacher_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherPayments" ADD CONSTRAINT "TeacherPayments_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("subject_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TeacherPayments" ADD CONSTRAINT "TeacherPayments_month_id_fkey" FOREIGN KEY ("month_id") REFERENCES "Months"("month_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
