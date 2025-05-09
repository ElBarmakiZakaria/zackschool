"use client"

import { useFormState } from "react-dom";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GradeSchema, gradeSchema } from "@/lib/formValidationSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGrade, updateGrade } from "@/lib/action";


const GradeForm = ({
    setOpen,
    type,
    data
}: {
    type: "create" | "update" | "delete";
    data?: any
    setOpen: Dispatch<SetStateAction<boolean>>

}) => {

    const [state, formAction] = useFormState(
        type === "create" ? createGrade : updateGrade,
        {
            success: false,
            error: false,
        }
    );
    
    

    const {
            register,
            handleSubmit,
            formState: { errors },
          } = useForm<GradeSchema>({
            resolver: zodResolver(gradeSchema),
          });
        
          const onSubmit = handleSubmit((data) => {
            
            formAction(data)
            setOpen(false);
            
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
            <>
            <h1 className="text-xl font-semibold">Create a new Grade</h1>
            </>

            ) : (
                <>
                <h1 className="text-xl font-semibold">update Grade name</h1>
                </>
            )}
            
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Grade"
                    name="grade"
                    defaultValue={data?.grade_id}
                    register={register}
                    error={errors?.grade}
                />
            </div>
            
            
            <button className="bg-blue-400 text-white p-2 rounded-md">
            {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    )

}

export default GradeForm;