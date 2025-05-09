// import { PrismaClient, UserSex } from "@prisma/client";
// const prisma = new PrismaClient();

// async function main() {
//   // ADMIN
//   await prisma.admin.createMany({
//     data: [
//       { id: "admin1", username: "admin1" },
//       { id: "admin2", username: "admin2" },
//     ],
//   });

//   // GRADES
//   for (let i = 1; i <= 6; i++) {
//     await prisma.grades.create({
//       data: {
//         grade_id: `grade${i}`,
//       },
//     });
//   }

//   // PARENTS
//   for (let i = 1; i <= 5; i++) {
//     await prisma.parents.create({
//       data: {
//         parent_id: i,
//         username: `parent${i}`,
//         first_name: `ParentFirstName${i}`,
//         surname: `ParentLastName${i}`,
//         email: `parent${i}@example.com`,
//         phone_number: `123-456-789${i}`,
//       },
//     });
//   }

//   // STUDENTS
//   for (let i = 1; i <= 20; i++) {
//     await prisma.students.create({
//       data: {
//         student_id: i,
//         username: `student${i}`,
//         first_name: `StudentFirstName${i}`,
//         last_name: `StudentLastName${i}`,
//         email: `student${i}@example.com`,
//         phone_number: `987-654-321${i}`,
//         sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
//         grade_id: `grade${(i % 6) + 1}`,
//         enrolment_date: new Date(),
//         status: i % 2 === 0,
//         StudentParent: {
//           create: {
//             parent_id: (i % 5) + 1,
//           },
//         },
//       },
//     });
//   }

//   // TEACHERS
//   for (let i = 1; i <= 14; i++) {
//     await prisma.teachers.create({
//       data: {
//         teacher_id: i,
//         username: `teacher${i}`,
//         first_name: `TeacherFirstName${i}`,
//         surname: `TeacherLastName${i}`,
//         email: `teacher${i}@example.com`,
//         phone_number: `456-789-012${i}`,
//         status: i % 2 === 0,
//       },
//     });
//   }

//   // SUBJECTS
//   for (let i = 1; i <= 20; i++) {
//     await prisma.subjects.create({
//       data: {
//         subject_id: i,
//         subject_name: `Subject${i}`,
//         price: (i * 10).toFixed(2),
//         teacher_id: (i % 14) + 1,
//       },
//     });
//   }

//   // RELATE STUDENTS TO SUBJECTS
//   for (let i = 1; i <= 20; i++) {
//     await prisma.studentSubject.create({
//       data: {
//         subject_id: i,
//         student_id: i,
//         enrollment_date: new Date(),
//       },
//     });
//   }

//   // RELATE TEACHERS TO SUBJECTS
//   for (let i = 1; i <= 14; i++) {
//     await prisma.teacherCommission.create({
//       data: {
//         teacher_id: i,
//         subject_id: (i % 20) + 1,
//         commission_amount: (i * 5).toFixed(2),
//         commission_type: "Percentage",
//       },
//     });
//   }

//   console.log("Seeding completed successfully.");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
