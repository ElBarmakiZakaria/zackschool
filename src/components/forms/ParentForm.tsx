"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { parentSchema, ParentSchema } from "@/lib/formValidationSchema";


const ParentForm = ({
    type,
    data
}: {
    type:"create" | "update";
    data?: any 

}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ParentSchema>({
        resolver: zodResolver(parentSchema),
      });
    
      const onSubmit = handleSubmit((data) => {
        console.log(data);
      });

  return (
<form className="flex flex-col gap-8" onSubmit={onSubmit}>
    {type === "create" ?(
        <h1 className="text-xl font-semibold">Create a new parent</h1>
      ) : (
        <h1 className="text-xl font-semibold">update parent information</h1>
      )}
      
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.first_name}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.surname}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone_number}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="child"
          name="child"
          defaultValue={data?.StudentParent?.student_id}
          register={register}
          error={errors.child}
        />
        
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  )
}


export default ParentForm;