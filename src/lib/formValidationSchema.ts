import { z } from "zod";

export const subjectSchema = z.object({
  subject_id: z.string().optional(),
  subject_name: z.string().min(4, { message: "Subject name is required!" }),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Price must be a valid decimal number." }),
  grade_id: z.string().min(3, { message: "Must be more than 3 letters" }),
  teacherportion: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Teacher portion must be a valid decimal number." }),
});
  
export type SubjectSchema = z.infer<typeof subjectSchema>;


export const gradeSchema = z.object({
    grade: z.string().min(5, { message: "Grade name is required!" }),
  });
  
export type GradeSchema = z.infer<typeof gradeSchema>;

export const studentSchema = z.object({
  student_id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  first_name: z
    .string()
    .min(1, { message: "First name is required!" }),
  last_name: z
    .string()
    .min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional(), // Optional field, as per the model
  phone_number: z
    .string()
    .optional(), // Optional field, as per the model
  profile_img: z
    .string()
    .optional(), // Optional field, as per the model
  sex: z
    .enum(["MALE", "FEMALE"], { message: "Sex is required!" }), // Assuming possible values for sex, adjust if needed
  grade_id: z
    .string()
    .min(1, { message: "Grade ID is required!" }),
  enrolment_date: z
    .date({ message: "Enrolment date is required!" }),
  status: z
    .boolean({ message: "Status is required!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const teacherSchema = z.object({
  teacher_id: z.string().optional(),
  username: z
    .string()
    .min(6, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  firstName: z.string().min(3, { message: "First name is required!" }),
  lastName: z.string().min(3, { message: "Last name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }).optional(),
  profile_img: z.string().optional(),
  phone: z.string().min(9, { message: "Phone is wrong" }),
  status: z.boolean({ message: "Status is required!" })
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

// Create a schema for student subject linking/updating
export const studentSubjectSchema = z.object({
  student_id: z.string().min(1, { message: "Student ID is required" }),
  subject_id: z.string().min(1, { message: "Subject is required" }),
  //subject_name: z.string().min(1, { message: "Subject name is required" }).optional(),
  enrolment_date: z
  .date({ message: "Enrolment date is required!" }),
  status: z.boolean()
});

export type StudentSubjectSchema = z.infer<typeof studentSubjectSchema>;

// Create a schema for student payment
export const studentPaymentSchema = z.object({
    payment_id: z.string().optional(),
    student_id: z.string().min(1, { message: "Student ID is required" }),
    subject_id: z.string().min(1, { message: "Subject is required" }),
    payment_date: z.date({ message: "Payment date is required!" }),
    amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Amount must be a valid decimal number." }),
    month_id: z.string().min(1, { message: "Month is required" }),
});

export type StudentPaymentSchema = z.infer<typeof studentPaymentSchema>;