"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { studentSchema, StudentSchema } from "@/lib/formValidationSchema";
import { createStudent, selectStudent, updateStudent } from "@/lib/action";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format, isToday } from "date-fns";
import { UserSex } from "@prisma/client";
import DropdownField from "../DropdownField";
import { profile } from "console";


type studentData = {
  student_id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone_number: string | null;
  profile_img: string | null;
  sex: UserSex;
  grade_id: string;
  status: boolean;
  enrolment_date: Date;
};


const StudentForm = ({
    setOpen,
    type,
    id
}: {
    type: "create" | "update" | "delete";
    id?: string 
    setOpen: Dispatch<SetStateAction<boolean>>,
}) => {
    const [status, setStatus] = useState<{ success: boolean; error: boolean }>({
      success: false,
      error: false,
    });

    
    const [studentData, setStudentData] = useState<studentData | null>(null);

    useEffect(() => {
      if (!id) return;

      const fetchStudent = async () => {
        //console.log("the student id: ", id)
        const data = await selectStudent(id);
        //console.log("the student data: ", data);
        setStudentData(data); // assuming you have a state for student data
      };
    
      fetchStudent();

      
    }, [id]);


    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm<StudentSchema>({
        resolver: zodResolver(studentSchema),
        // defaultValues: type === "create" ? {
        //   enrolment_date: new Date(), // 👈 provide a default Date object
        //   status: true,
        //   sex: "MALE", // or some sensible default
        // } : undefined,
      });
    
      const onSubmit = handleSubmit(async (formData) => {
        //console.log("the button has been clicked: ", type)
        const fullData = {
          ...formData,
          student_id: studentData?.student_id,
          profile_img: studentData?.profile_img ?? undefined,
        };

        try {
          let response;
          if (type === "create") {
            
            response = await createStudent(fullData); // Call the createTeacher function
          } else {
            response = await updateStudent(fullData); // Call the updateTeacher function
          }
    
          // Check the response for success or error
          if (response.success) {
            setStatus({ success: true, error: false });
            setOpen(false);
          } else {
            setStatus({ success: false, error: true });
          }

          console.log(response)
        } catch (error) {
          console.error("Error during submission:", error);
          setStatus({ success: false, error: true });
        }

        
        
      });


      const router = useRouter()

      useEffect(() => {
            if (status.success) {
                setOpen(false);
                router.refresh(); // Refresh page after success
            }
        }, [status.success]);

      useEffect(() => {
        if (!studentData) return;
        setValue("status", studentData.status); // boolean!
        setValue("sex", studentData.sex);
        setValue("username", studentData.username);
        setValue("first_name", studentData.first_name);
        setValue("last_name", studentData.last_name);
        setValue("email", studentData.email || "");
        setValue("phone_number", studentData.phone_number || "");
        setValue("grade_id", studentData.grade_id);
        setValue("enrolment_date", studentData.enrolment_date);

      }, [studentData, setValue]);


  return (
<form className="flex flex-col gap-8" onSubmit={onSubmit}>
    {type === "create" ?(
        <h1 className="text-xl font-semibold">Create a new student</h1>
      ) : (
        <h1 className="text-xl font-semibold">update student information</h1>
      )}
      
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={studentData?.username || ""} 
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={studentData?.email || ""}
          register={register}
          error={errors?.email}
        />

      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="first_name"
          defaultValue={studentData?.first_name || ""}
          register={register}
          error={errors.first_name}
        />
        <InputField
          label="Last Name"
          name="last_name"
          defaultValue={studentData?.last_name || ""}
          register={register}
          error={errors.last_name}
        />
        <InputField
          label="Phone"
          name="phone_number"
          defaultValue={studentData?.phone_number || ""}
          register={register}
          error={errors.phone_number}
        />

       

        

      {type === "create" ? (
        <>
          <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Enrolment Date</label>
          <input
            type="datetime-local"
            {...register("enrolment_date", {
              setValueAs: (value) => value ? new Date(value) : undefined,
            })}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            //defaultValue={new Date().toISOString().slice(0, 16)} // Optional: sets initial value to current datetime
          />
          {errors.enrolment_date?.message && (
            <p className="text-xs text-red-400">
              {errors.enrolment_date.message.toString()}
            </p>
          )}
        </div>

          <DropdownField 
            label="Grade"
            name="grade_id"
            table="grades"
            defaultValue={studentData?.grade_id}
            displayField="grade_id"
            register={register}
            error={errors?.grade_id}
          />
          </>
        ):(
          <>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm text-gray-500" >Enrolment date</label>
            <span>{studentData?.enrolment_date
              ? format(new Date(studentData.enrolment_date), "yyyy-MM-dd' at 'HH:mm")
              : ""}</span>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm text-gray-500" >Grade</label>
            <span>{studentData?.grade_id}</span>
          </div>
          </>
        )}


    {/* <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500"> date</label>
          <input
            type="datetime-local"
            {...register("enrolment_date")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.enrolment_date} // Format as YYYY-MM-DD
          />
          {errors?.enrolment_date && (
            <p className="text-xs text-red-400">{errors.enrolment_date.toString()}</p>
          )}
        </div> */}

        
        <div className="flex flex-col gap-1 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Status</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("status", {
              setValueAs: (value) => {
                if (value === "true") return true;
                if (value === "false") return false;
                return studentData?.status ?? false;
              },
            })}
            defaultValue={studentData?.status ? "true" : "false"}
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

        <div className="flex flex-col gap-1 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={studentData?.sex}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        {/* <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div> */}
      </div>
      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  )
}


export default StudentForm