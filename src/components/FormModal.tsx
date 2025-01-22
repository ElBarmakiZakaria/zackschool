"use client"

import { deleteSubject } from "@/lib/action";
import { Delete, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";


const deleteActionMap = {
    subject: deleteSubject,
    // teacher: deleteTeacher,
    // student: deleteStudent,
    // exam: deleteExam,
  };




const TeacherForm = dynamic(() => import("./forms/TeacherForm"),{
    loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(()=>import("./forms/StudentForm"),{
    loading: () => <h1>Loading...</h1>,
});
const ParentForm = dynamic(()=>import("./forms/ParentForm"),{
    loading: () => <h1>Loading...</h1>,
});
const PaymentForm = dynamic(()=>import("./forms/paymentForm"),{
    loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(()=>import("./forms/SubjectForm"),{
    loading: () => <h1>Loading...</h1>,
});

const forms:{
    [key:string]:(setOpen:Dispatch<SetStateAction<boolean>>,  type:"create" | "update", data?:any ) => JSX.Element;
} = {
    teacher: (setOpen, type, data) => <TeacherForm type={type} data={data} />,
    student: (setOpen, type, data) => <StudentForm type={type} data={data} />,
    parent:  (setOpen, type, data) => <ParentForm type={type} data={data} />,
    subject: (setOpen, type, data) => <SubjectForm type={type} data={data} setOpen={setOpen}/>

}


const FormModal = ({table,type,data,id}:{
    table:
    | "teacher"
    | "student"
    | "parent"
    | "subject";
    
    type: "create" | "update" | "delete";
    data?: any;
    id?: number;
}) => {

    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    
    const bgColor = 
        type === "create" 
        ? "bg-lamaSky"
        : type === "update"
        ? "bg-lamaYellow"
        : "bg-lamaPurple";
    
    const [open, setOpen] = useState(false);

    const Form = () => {

        const [state, formAction] = useFormState(deleteSubject, {
            success: false,
            error: false,
        });

        const router = useRouter()
    
        useEffect(() => {
            if (state.success){
                setOpen(false);
                router.refresh();
                
            }
        }, [state]);

        return type === "delete" && id ? (
        <form action={formAction} className="p-4 flex flex-col gap-4">
            <input type="text | number" name="id" value={id} hidden />
            <span className="text-center font-medium">All date will be lost. are you sure you want to delete this {table}?</span>
            <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">Delete</button>
        </form>
        ) : type === "create" || type === "update" ? (
            forms[table](setOpen, type, data)
        ) : (
            "Form not found!"
        );
    };

  return <>
        <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
            onClick={()=>setOpen(true)}
        >
            {type === "delete" ? (<Trash2 width={16} height={16} color="white"/>)
             :(
                <Image src={`/${type}.png`} alt="" width={16} height={16}/>
            )}
            
        </button>

        {open && (
            <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                    <Form />
                
                    <div className="absolute top-4 right-4 cursor-pointer" onClick={()=>setOpen(false)}>
                    <Image src="/close.png" width={14} height={14} alt=""/>
                    </div>
                </div>
            
        </div>)}

    </>
  
}

export default FormModal;