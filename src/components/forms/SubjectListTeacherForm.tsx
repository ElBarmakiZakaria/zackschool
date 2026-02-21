"use client"

import { createTeacherSubject, selectSubjectsForteacher, updateTeacherSubject } from "@/lib/action";
import { TeacherSubjectSchema, teacherSubjectSchema } from "@/lib/formValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { string } from "zod";
import DropdownField from "../DropdownField";

const SubjectListTeacherForm = ({
    handleClose,
    type,
    id,
    teacherId
}: {
    handleClose: (value: boolean) => void;
    type: "create" | "update" | "delete";
    id?: string;
    teacherId?: string;
}) => {
    const [status, setStatus] = useState<{ success: boolean; error: boolean}>({
        success: false,
        error: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<TeacherSubjectSchema>({
        resolver: zodResolver(teacherSubjectSchema),
        defaultValues: useMemo(() => ({
            teacher_id: teacherId || "",
            subject_id: id || "",
            assigned_date: new Date(),
            status: true,
         }), [teacherId, id])
        
    });

    const { register, handleSubmit, setValue, formState: { errors } } = form;

    useEffect(() => {
        
        const fetchTeacherData = async () => {
        if (type !== "update") return;
        setIsLoading(true)
        try {
            const subjects = await selectSubjectsForteacher(teacherId!);
            const selectedSubject = subjects?.find((subject) => subject.subject_id === id);
            console.log(selectedSubject)
            if (selectedSubject) {
                setValue("subject_id", selectedSubject.subject_id);
                setValue("teacher_id", selectedSubject.teacher_id);
                setValue("assigned_date", new Date(selectedSubject.assigned_date));
                setValue("status", selectedSubject.status);
        }
        } catch (error) {
            console.error('Error loading subject data:', error);
        } finally {
            setIsLoading(false);
        }
        };

        fetchTeacherData();
    }, [id, type, teacherId, setValue]);

    const onSubmit = handleSubmit(async (formData) => {
        
        const fullData = {
            ...formData,
            teacher_id: formData.teacher_id,
            subject_id: formData.subject_id,
            assigned_date: formData.assigned_date,
            status: formData.status,
          };

        try {
          let response;
          if (type === "create") {
            // Implement create action for linking a new subject
            // response = await createteacherSubject(formData);
           
            console.log(fullData);
            response = await createTeacherSubject(fullData);
            console.log(response)
          } else {
            // Implement update action for changing subject status
            // response = await updateTeacherSubject(formData);
            console.log(fullData);
            response = await updateTeacherSubject(fullData);
          }
    
    
          if (response.success) {
            setStatus({ success: true, error: false });
            handleClose(false);        
          } else {
            alert(`${type} action cannot be finished!!`)
            setStatus({ success: false, error: true });
          }
        } catch (error) {
          console.error("Error during submission:", error);
          setStatus({ success: false, error: true });
        }
    
      });
    
    useEffect(() => {
    if (status.success) {
      handleClose(false);
      router.refresh();
    }
  }, [status, handleClose, router]);

  
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-60 z-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      {type === "create" ? (
        <>
          <h1 className="text-xl font-semibold">Link New Subject</h1>
          <DropdownField
            label="Subject"
            name="subject_id"
            table="subjects"
            displayField="subject_name"
            gradeValue="grade_id"
            displayValue="subject_id"
            register={register}
            error={errors.subject_id}
          />
          <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Assignment Date</label>
          <input
            type="datetime-local"
            {...register("assigned_date", {
              setValueAs: (value) => value ? new Date(value) : undefined,
            })}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            //defaultValue={new Date().toISOString().slice(0, 16)} // Optional: sets initial value to current datetime
          />
          {errors.assigned_date?.message && (
            <p className="text-xs text-red-400">
              {errors.assigned_date.message.toString()}
            </p>
          )}
        </div>
          
          
        </>
      ) : (
        <>
          <h1 className="text-xl font-semibold">Update Subject Status</h1>
          
          <input
            name="subject_name"
            type="text"
            defaultValue={form.getValues("subject_id")}
            disabled
          />


        </>
      )}

        <div className="flex flex-col gap-1 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Status</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("status", {
              setValueAs: (value) => {
                if (value === "true") return true;
                if (value === "false") return false;
                return form.getValues("status") ?? false;
              },
            })}
            defaultValue={form.getValues("status") ? "true" : "false"}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          {errors.status?.message && (
            <p className="text-xs text-red-400">
              {errors.status.message.toString()}
            </p>
          )}
        </div>
      
      <button 
        type="submit" 
        className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 transition-colors"
      >
        {type === "create" ? "Link Subject" : "Update Status"}
      </button>

      {status.error && (
        <p className="text-red-500 text-sm">
          {type === "create" 
            ? "Failed to link subject" 
            : "Failed to update subject status"}
        </p>
      )}
    </form>
    </div>
  )

  

};

export default SubjectListTeacherForm;