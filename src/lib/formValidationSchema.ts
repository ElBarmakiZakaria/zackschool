import { z } from "zod";

export const subjectSchema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: "Subject name is required!" }),
    price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Price must be a valid decimal number." }),
    teacher: z.string().optional(), //teacher ids
  });
  
export type SubjectSchema = z.infer<typeof subjectSchema>;



export const studentSchema = z.object({
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
        .optional(), // Optional field
    phone_number: z
        .string()
        .min(1, { message: "Phone number is required!" }),
    // sex: z.enum(["male", "female"], { message: "Sex is required!" }),
    grade_id: z
        .string()
        .min(1, { message: "Grade ID is required!" }),
    enrolment_date: z
        .date({ message: "Enrolment date is required!" }),
    status: z
        .boolean({ message: "Status is required!" }),
    // Relations and nested data could be validated separately
    // using dedicated schemas if necessary
});

export type StudentSchema = z.infer<typeof studentSchema>;


export const teacherSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  // password: z
  //   .string()
  //   .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  // address: z.string().min(1, { message: "Address is required!" }),
  // bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  // birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  status: z
        .boolean({ message: "Status is required!" }),
});

export type TeacherSchema = z.infer<typeof teacherSchema>;



export const parentSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long!" })
      .max(20, { message: "Username must be at most 20 characters long!" }),
    email: z.string().email({ message: "Invalid email address!" }),
    firstName: z.string().min(1, { message: "First name is required!" }),
    lastName: z.string().min(1, { message: "Last name is required!" }),
    phone: z.string().min(1, { message: "Phone is required!" }),
    child: z.string().min(1, { message: "It needs to be at least one kid!" }),
  });

export type ParentSchema = z.infer<typeof parentSchema>;
