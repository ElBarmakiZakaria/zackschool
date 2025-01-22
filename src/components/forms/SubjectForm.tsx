"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchema";
import { createSubject, updateSubject } from "@/lib/action";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";




const SubjectForm = ({
    setOpen,
    type,
    data
}: {
    type:"create" | "update";
    data?: any 
    setOpen: Dispatch<SetStateAction<boolean>>,

}) => {

    const [state, formAction] = useFormState(
        type === "create" ? createSubject : updateSubject,
        {
          success: false,
          error: false,
        }
      );

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<SubjectSchema>({
        resolver: zodResolver(subjectSchema),
      });
    
      const onSubmit = handleSubmit((data) => {
        console.log(data);
        formAction(data)
      });


    const router = useRouter()
    
    useEffect(() => {
        if (state.success){
            setOpen(false);
            router.refresh();
            
        }
    }, [state]);


    return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        {type === "create" ?(
            <h1 className="text-xl font-semibold">Create a new Subject</h1>
            ) : (
            <h1 className="text-xl font-semibold">update Subject information</h1>
            )}
            
            <div className="flex justify-between flex-wrap gap-4">
            <InputField
                label="subject id"
                name="id"
                defaultValue={data?.subject_id}
                register={register}
                error={errors?.id}
            />
            <InputField
                label="subject Name"
                name="name"
                defaultValue={data?.subject_name}
                register={register}
                error={errors?.name}
            />
            <InputField
                label="Price"
                name="price"
                defaultValue={data?.price}
                register={register}
                error={errors?.price}
            />
            <InputField
                label="Teacher"
                name="teacher"
                defaultValue={data?.teacher_id}
                register={register}
                error={errors?.teacher}
            />
            </div>
            
            
            <button className="bg-blue-400 text-white p-2 rounded-md">
            {type === "create" ? "Create" : "Update"}
            </button>
        </form>
        )

}

export default SubjectForm;