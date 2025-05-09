"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import InputField from "../InputField";
import { TeacherSchema, teacherSchema } from "@/lib/formValidationSchema";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createTeacher, selectTeacher, updateTeacher } from "@/lib/action";
import { useRouter } from "next/navigation";

type teacherData = {
  teacher_id: string
  username: string
  email: string | null
  first_name: string
  surname: string
  phone_number: string
  profile_img: string | null
  status: boolean
}



const TeacherForm = ({
    setOpen,
    type,
    id
}: {
    type:"create" | "update" | "delete";
    id?: string
    setOpen: Dispatch<SetStateAction<boolean>>,

}) => {
  
    const [status, setStatus] = useState<{ success: boolean; error: boolean }>({
      success: false,
      error: false,
    });

    const [teacherData, setTeacherData] = useState<teacherData | null>(null);

    useEffect(() => {
      if (!id) return;

      const fetchTeacher = async () => {
        const data = await selectTeacher(id);
        //console.log("the teacher data: ", data);
        setTeacherData(data);
      };
    
      fetchTeacher();
      
    }, [id]);


    
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm<TeacherSchema>({
        resolver: zodResolver(teacherSchema),
      });

      
    
    const onSubmit = handleSubmit(async (formData) => {
      const fullData = { ...formData,
        teacher_id: teacherData?.teacher_id,
        profile_img: teacherData?.profile_img ?? undefined,
      };


      //console.log(fullData);

      try {
        let response;
        if (type === "create") {
          
          response = await createTeacher(fullData); // Call the createTeacher function
        } else {
          response = await updateTeacher(fullData); // Call the updateTeacher function
        }
  
        // Check the response for success or error
        if (response.success) {
          setStatus({ success: true, error: false });
          setOpen(false);
        } else {
          setStatus({ success: false, error: true });
        }
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
      if (!teacherData) return;
      setValue("status", teacherData.status); // boolean!
      setValue("username", teacherData.username);
      setValue("firstName", teacherData.first_name);
      setValue("lastName", teacherData.surname);
      setValue("email", teacherData.email || "");
      setValue("phone", teacherData.phone_number);
    }, [teacherData, setValue]);



  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      {type === "create" ?(
        <h1 className="text-xl font-semibold">Add a new teacher</h1>
      ) : (
        <h1 className="text-xl font-semibold">update tracher information</h1>
      )}
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={teacherData?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={teacherData?.email || ""}
          register={register}
          error={errors?.email}
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={teacherData?.first_name}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={teacherData?.surname}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={teacherData?.phone_number}
          register={register}
          error={errors.phone}
        />

  
        <div className="flex flex-col gap-1 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Status</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("status", {
              setValueAs: (value) => {
                if (value === "true") return true;
                if (value === "false") return false;
                return teacherData?.status ?? false;
              },
            })}
            defaultValue={teacherData?.status ? "true" : "false"}
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

        {/* <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="profile_img" {...register("profile_img")} className="hidden" />
          {errors.profile_img?.message && (
            <p className="text-xs text-red-400">
              {errors.profile_img.message.toString()}
            </p>
          )}
        </div> */}
        
        
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  )
}


export default TeacherForm