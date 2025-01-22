"use server";

import { revalidatePath } from "next/cache";
import { StudentSchema, SubjectSchema } from "./formValidationSchema";
import prisma from "./prisma";

type CurrentState = {success: boolean; error: boolean};

export const createSubject = async (
    currentState: CurrentState,
    data: SubjectSchema) => {
  try {
    // Check if the subject name already exists
    const existingSubject = await prisma.subjects.findUnique({
      where: { subject_name: data.name },
    });

    if (existingSubject) {
      throw new Error("A subject with this name already exists.");
    }

    // Create the new subject
    await prisma.subjects.create({
      data: {
        subject_id: parseInt(data.id),
        subject_name: data.name,
        price: parseFloat(data.price),
        teacher_id: data.teacher ? parseInt(data.teacher) : null, // Handle teacher ID
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
  currentState: CurrentState,
  data: SubjectSchema) => {
try {
  

  // update the new subject
  await prisma.subjects.update({
    where:{
      subject_id: parseInt(data.id),
    },
    data: {
      subject_name: data.name,
      price: parseFloat(data.price),
      teacher_id: data.teacher ? parseInt(data.teacher) : null, // Handle teacher ID
    },
  });

  // Revalidate the path
  //revalidatePath("/list/subjects");
  return {success: true, error: false}
} catch (error) {
  console.log(error);
  return {success: false, error: true}
}
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData) => {
try {
  
  const id = data.get("id") as string
  console.log(id);

  // delete the new subject
  await prisma.subjects.delete({
    where:{
      subject_id: parseInt(id),
    },
  });

  // Revalidate the path
  //revalidatePath("/list/subjects");
  return {success: true, error: false}
} catch (error) {
  console.log(error);
  return {success: false, error: true}
}
};



