"use server";

import { revalidatePath } from "next/cache";
import { GradeSchema, gradeSchema, StudentPaymentSchema, StudentSchema, StudentSubjectSchema, SubjectSchema, TeacherSchema } from "./formValidationSchema";
import prisma from "./prisma";
import { string } from "zod";
import { Erica_One } from "next/font/google";

type CurrentState = {success: boolean; error: boolean};


export const createGrade = async (
    currentState: CurrentState,
    data: GradeSchema
) => {
    try {
        // Check if the grade name already exists
        const existingGrade = await prisma.grades.findUnique({
            where:{ grade_id: data.grade },
        });

        if (existingGrade) {
            throw new Error("A grade with this name already exists.");
        }

        // Create the new grade
        await prisma.grades.create({
            data: {
            grade_id: data.grade,
            },
        });

        // Revalidate the path
        revalidatePath("/list/classes");
        return {success: true, error: false}

    } catch (error) {
        console.log(error);
        return {success: false, error: true}
    }
}

export const updateGrade = async (
    currentState: CurrentState,
    data: GradeSchema
) => {
    try {

        // update the grade
        await prisma.grades.update({
          where:{
            grade_id: data.grade,
          },
          data: {
            grade_id: data.grade,
          },
        });
      
        // Revalidate the path
        revalidatePath("/list/classes");
        return {success: true, error: false}
      } catch (error) {
        console.log(error);
        return {success: false, error: true}
      }
}


export const createSubject = async (
    data: SubjectSchema) => {
  try {


    // Create the new subject
    await prisma.subjects.create({
      data: {
        subject_name: data.subject_name,
        price: parseFloat(data.price), // Ensure that data.price is a string or number
        teacher_portion: parseFloat(data.teacherportion),
        grade_id: data.grade_id,
      },
    });

    // Revalidate the path
    revalidatePath("/list/subjects");
    return {success: true, error: false}
  } catch (error) {
    console.log(error);
    return {success: false, error: true}
  }
};

export const updateSubject = async (
  data: SubjectSchema) => {
try {

  // update the new subject
  await prisma.subjects.update({
    where:{
      subject_id: data.subject_id,
    },
    data: {
      subject_name: data.subject_name,
      price: parseFloat(data.price),
      teacher_portion: parseFloat(data.teacherportion),
      grade_id: data.grade_id,
    },
  });

  // Revalidate the path
  revalidatePath("/list/subjects");
  return {success: true, error: false}
} catch (error) {
  console.log(error);
  return {success: false, error: true}
}
};

export const deleteSubject = async (
  id?: string) => {
try {

  console.log("Deleting subject with ID:", id);

  await prisma.subjects.delete({
    where: {
      subject_id: id,
    },
  });

  // Revalidate the path
  revalidatePath("/list/subjects");
  return {success: true, error: false}
} catch (error) {
  console.log(error);
  return {success: false, error: true}
}
};


export const createTeacher = async (

  data: TeacherSchema) => {
try {

  const email = data.email || null;

  // Create the new subject
  await prisma.teachers.create({
    data: {
      username: data.username,
      email,
      first_name: data.firstName,
      surname: data.lastName,
      phone_number: data.phone,
      profile_img: data.profile_img || null,
      status: data.status,
    },
  });

  // Revalidate the path
  revalidatePath("/list/teachers");
  return {success: true, error: false}
} catch (error) {
  console.log(error);
  return {success: false, error: true}
}
};

export const updateTeacher = async (
  data: TeacherSchema) => {

    try {
      const email = data.email || null;
      
      await prisma.teachers.update({
        where:{
          teacher_id: data.teacher_id,
        },
        data: {
          username: data.username,
          email,
          first_name: data.firstName,
          surname: data.lastName,
          phone_number: data.phone,
          profile_img: data.profile_img || null,
          status: data.status,
        },
      });
  
      revalidatePath("/list/teachers");
      return { success: true, error: false };
    } catch (error) {
      console.error(error);
      return { success: false, error: true }; // make sure to always return something
    }
  };


export const deleteTeacher = async (
  id: string) => {

    try {

      await prisma.teachers.delete({
        where: {
          teacher_id: id,
        },
      });
      
      revalidatePath("/list/teachers");
      return { success: true, error: false };
    } catch (error) {
      console.error(error);
      return { success: false, error: true }; // make sure to always return something
    }
  };

export const createStudent = async (
  data: StudentSchema
) => {
  try {

    await prisma.students.create({
      data: {
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email || null,
        phone_number: data.phone_number || null,
        profile_img: data.profile_img || null,
        sex: data.sex,
        grade_id: data.grade_id,
        enrolment_date: data.enrolment_date,
        status: data.status,
      },
    });

    // Revalidate the path
    revalidatePath("/list/students");
    return {success: true, error: false}
  } catch (error) {
    console.log(error);
    return {success: false, error: true}
  }
};

export const updateStudent = async (
  data: StudentSchema) => {

    try {
      
      await prisma.students.update({
        where:{
          student_id: data.student_id,
        },
        data: {
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email || null,
          phone_number: data.phone_number || null,
          profile_img: data.profile_img || null,
          sex: data.sex,
          grade_id: data.grade_id,
          enrolment_date: data.enrolment_date,
          status: data.status,
        },
      });
  
      revalidatePath("/list/students");
      return { success: true, error: false };
    } catch (error) {
      console.error(error);
      return { success: false, error: true }; // make sure to always return something
    }
  };


export const deleteStudent = async (
  id: string) => {

    try {

      await prisma.students.delete({
        where: {
          student_id: id,
        },
      });
      
      revalidatePath("/list/students");
      return { success: true, error: false };
    } catch (error) {
      console.error(error);
      return { success: false, error: true }; // make sure to always return something
    }
  };


export const selectStudent = async (
  id: string,
)=> {
  try {
    const studentData = await prisma.students.findUnique({
      where:{
        student_id: id,
      }
    })

    return studentData

  } catch (error) {
    console.error(error);
    return null; // Don't return error arrays
  }
};

export const selectTeacher = async (
  id: string,
)=> {
  try {
    const teacherData = await prisma.teachers.findUnique({
      where:{
        teacher_id: id,
      }
    })

    return teacherData

  } catch (error) {
    console.error(error);
    return null; // Don't return error arrays
  }
};

export const selectSubject = async (
  id: string,
) => {
  try {
    const subjectData = await prisma.subjects.findUnique({
      where: {
        subject_id: id,
      }
    })

    return subjectData

  } catch (error) {
    console.error(error);
    return null
  }
}


export const selectStudentForPage = async (
  id: string,
)=> {
  try {
    const studentData = await prisma.students.findUnique({
      where:{
        student_id: id,
      },
      include: {
        StudentSubjects: true,
        
      }
    })

    return studentData

  } catch (error) {
    console.error(error);
    return null; // Don't return error arrays
  }
};


export const selectSubjectsForStudent = async (
  id: string,
) => {
  try {
    const studentSubjects = await prisma.studentSubjects.findMany({
      where: {
        student_id: id,
      },
      include: {
        Subjects: {
          include: {
            TeacherSubjects: {
              include: {
                Teachers: true
              }
            }
          }
        }
      },
      orderBy: {
        enrollment_date: 'desc'
      }
    });

    // Transform the data to match the exact requirements
    const formattedSubjects = studentSubjects.map(subject => ({
      student_id: subject.student_id,
      subject_id: subject.Subjects.subject_id,
      subject_name: subject.Subjects.subject_name,
      enrolment_date: subject.enrollment_date,
      price: subject.Subjects.price,
      teacher_name: subject.Subjects.TeacherSubjects[0]?.Teachers.first_name + ' ' + subject.Subjects.TeacherSubjects[0]?.Teachers.surname || '---',
      status: subject.status
    }));

    return formattedSubjects;

  } catch (error) {
    console.error('Error retrieving student subjects:', error);
    return null;
  }
};

export const selectPaymentsForStudent = async (id: string) => {
  try {
    const payments = await prisma.studentPayments.findMany({
      where: {
        student_id: id
      },
      include: {
        Subjects: {
          select: {
            subject_id: true,
            subject_name: true
          }
        }
      }
    });

    return payments.map(payment => ({
      ...payment,
      subject_name: payment.Subjects.subject_name
    }));
  } catch (error) {
    console.error('Error fetching student payments:', error);
    return null;
  }
}

export const selectPayment = async (id: string) => {
  try {
    const payment = await prisma.studentPayments.findUnique({
      where: {
        payment_id: id
      }
    });

    return payment;
    
  } catch (error) {
    console.error('Error fetching student payments:', error);
    return null;
  }
}

export const createStudentSubject = async (
  data: StudentSubjectSchema
) => {
  try {
    await prisma.studentSubjects.create({
      data: {
        student_id: data.student_id,
        subject_id: data.subject_id,
        enrollment_date: data.enrolment_date,
        status: data.status, // default to true if not provided
      },
    });

    revalidatePath(`/list/students/${data.student_id}`);
    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating student subject:", error);
    return { success: false, error: true };
  }
};



export const updateStudentSubject = async (
data: StudentSubjectSchema
) => {
  try {
    await prisma.studentSubjects.update({
      where: {
        student_id_subject_id: {
          student_id: data.student_id,
          subject_id: data.subject_id,
        },
      },
      data: {
        status: data.status,
      },
    });     

    revalidatePath(`/list/students/${data.student_id}`);
    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating student subject:", error);
    return { success: false, error: true };
  }
};

export const createStudentPayment = async (
  data: StudentPaymentSchema
) => {
  try {
    await prisma.studentPayments.create({
      data: {
        student_id: data.student_id,
        subject_id: data.subject_id,
        payment_date: data.payment_date,
        amount: parseFloat(data.amount),
        month_id: data.month_id,
      },
    });

    revalidatePath(`/list/students/${data.student_id}`);
    return { success: true, error: false };
  } catch (error) {
    console.error("Error creating student payment:", error);
    return { success: false, error: true };
  }
};

export const updateStudentPayment = async (
  data: StudentPaymentSchema
) => {
  try {
    await prisma.studentPayments.update({
      where: {
        payment_id: data.payment_id,
      },
      data: {
        amount: parseFloat(data.amount),
        month_id: data.month_id,
      },
    });

    revalidatePath(`/list/students/${data.student_id}`);
    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating student payment:", error);
    return { success: false, error: true };
  }
};