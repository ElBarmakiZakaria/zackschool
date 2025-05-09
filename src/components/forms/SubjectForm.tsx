"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchema";
import { createSubject, deleteSubject, selectSubject, updateSubject } from "@/lib/action";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DropdownField from "../DropdownField";
import { Decimal } from "@prisma/client/runtime/library";
import { studentsData } from "@/lib/data";

type subjectData = {
  subject_id: string
  subject_name: string
  price: Decimal
  grade_id: string
  teacher_portion: Decimal
}

const SubjectForm = ({
    setOpen,
    type,
    id
}: {
    type:"create" | "update" | "delete";
    id?: string
    setOpen: Dispatch<SetStateAction<boolean>>,

}) => {

    // const [state, formAction] = useFormState(
    //     type === "create" ? createSubject : updateSubject,
    //     {
    //       success: false,
    //       error: false,
    //     }
    //   );

    const [status, setStatus] = useState<{ success: boolean; error: boolean}>({
      success: false,
      error: false,
    });


    const [subjectData, setSubjectData] = useState<subjectData | null>(null);
    
        useEffect(() => {
          if (!id) return;
    
          const fetchSubject = async () => {
            const data = await selectSubject(id);
            //console.log("the teacher data: ", data);
            setSubjectData(data);
            //console.log(data)
          };
        
          fetchSubject();
          
        }, [id]);
      

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm<SubjectSchema>({
        resolver: zodResolver(subjectSchema),
        // defaultValues: {
        //     grade_id: subjectData?.grade_id, // assuming `name` is something like 'grade'
        //   },
      });
    
      const onSubmit = handleSubmit(async (formData) => {
        const fullData = {
          ...formData,
          subject_id: subjectData?.subject_id, // include subject_id if it exists
        };
      
        try {
          let response;
          if (type === "create") {
            response = await createSubject(fullData);
          } else if (type === "update") {
            response = await updateSubject(fullData);
          } else {
            response = await deleteSubject(fullData.subject_id)
          }

          if (response.success) {
            setStatus({ success: true, error: false});
            setOpen(false);
          } else {
            alert(`${type} action cannot be finished!!`)
            setStatus({ success: false, error: true});
          }

          console.log(response)

        } catch (error) {
          console.error("Error during submission:", error);
          setStatus({ success: false, error: true});
        }

        
      });


    const router = useRouter()
    
    useEffect(() => {
        if (status.success){
            setOpen(false);
            router.refresh();
            
        }
    }, [status.success]);

    useEffect(() => {
      if (!subjectData) return;

      setValue("subject_name", subjectData.subject_name);
      setValue("price", subjectData.price.toString());
      setValue("teacherportion", subjectData.teacher_portion.toString());
      setValue("grade_id", subjectData.grade_id);

    }, [subjectData, setValue]);


    return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        {type === "delete" ? (
          <>
            <input type="text | number" name="id" value={id} hidden />
            <span className="text-center font-medium">All date will be lost. are you sure you want to delete this subject?</span>
            <button type="submit" className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">Delete</button>
          </>
        ) : (
          <>


        {type === "create" ?(
            <h1 className="text-xl font-semibold">Create a new Subject</h1>
            ) : (
            
            <h1 className="text-xl font-semibold">update Subject information: {id}</h1>

            )}
            
            <div className="flex justify-between flex-wrap gap-4">
            <InputField
                label="subject Name"
                name="subject_name"
                defaultValue={subjectData?.subject_name}
                register={register}
                error={errors?.subject_name}
            />
            <InputField
                label="Price"
                name="price"
                defaultValue={subjectData?.price?.toString() ?? ""}
                register={register}
                error={errors?.price}
            />

            <InputField
                label="Teacher Portion"
                name="teacherportion"
                defaultValue={subjectData?.teacher_portion?.toString() ?? ""}
                register={register}
                error={errors?.teacherportion}
            />

            {type === "create" ? (
              <DropdownField 
                label="Grade"
                name="grade_id"
                table="grades"
                defaultValue={subjectData?.grade_id}
                displayField="grade_id"
                register={register}
                error={errors?.grade_id}
              />
            ) : (
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm text-gray-500" >Grade</label>
                <span>{subjectData?.grade_id}</span>
              </div>
            )}



            </div>
            
            
            <button className="bg-blue-400 text-white p-2 rounded-md">
            {type === "create" ? "Create" : "Update"}
            </button>
            </>
        )}
        </form>
        )

}

export default SubjectForm;