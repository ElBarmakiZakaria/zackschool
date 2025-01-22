-- CreateTable
CREATE TABLE "Grades" (
    "grade_id" TEXT NOT NULL,

    CONSTRAINT "Grades_pkey" PRIMARY KEY ("grade_id")
);

-- CreateTable
CREATE TABLE "Parents" (
    "parent_id" SERIAL NOT NULL,
    "first_name" VARCHAR(30),
    "surname" VARCHAR(30),
    "phone_number" VARCHAR(20),

    CONSTRAINT "Parents_pkey" PRIMARY KEY ("parent_id")
);

-- CreateTable
CREATE TABLE "Students" (
    "student_id" SERIAL NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "first_name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "grade_id" TEXT NOT NULL,
    "enrolment_date" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "StudentParent" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "parent_id" INTEGER NOT NULL,

    CONSTRAINT "StudentParent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teachers" (
    "teacher_id" SERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "first_name" VARCHAR(30),
    "surname" VARCHAR(30),
    "phone_number" VARCHAR(20),
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Teachers_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "Subjects" (
    "subject_id" SERIAL NOT NULL,
    "subject_name" VARCHAR(20) NOT NULL,
    "price" MONEY,
    "teacher_id" INTEGER,

    CONSTRAINT "Subjects_pkey" PRIMARY KEY ("subject_id")
);

-- CreateTable
CREATE TABLE "TeacherCommission" (
    "teacher_commission_id" SERIAL NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "commission_amount" MONEY,
    "commission_type" VARCHAR(10),

    CONSTRAINT "TeacherCommission_pkey" PRIMARY KEY ("teacher_commission_id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "payment_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "amount" MONEY,
    "due_amount" MONEY,
    "balance" MONEY,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "paid" BOOLEAN NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "attendance_id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "attendance_date" TIMESTAMP(3) NOT NULL,
    "attendance_status" VARCHAR(10),

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teachers_username_key" ON "Teachers"("username");

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "Grades"("grade_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentParent" ADD CONSTRAINT "StudentParent_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentParent" ADD CONSTRAINT "StudentParent_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Parents"("parent_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subjects" ADD CONSTRAINT "Subjects_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("teacher_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherCommission" ADD CONSTRAINT "TeacherCommission_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("teacher_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherCommission" ADD CONSTRAINT "TeacherCommission_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;
