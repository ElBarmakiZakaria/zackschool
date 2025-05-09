"use client"

import { deleteSubject } from "@/lib/action";
import { Delete, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";


const TeacherForm = dynamic(() => import("./forms/TeacherForm"),{
    loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(()=>import("./forms/StudentForm"),{
    loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(()=>import("./forms/SubjectForm"),{
    loading: () => <h1>Loading...</h1>,
});
const GradeForm = dynamic(()=>import("./forms/GradeForm"),{
    loading: () => <h1>Loading...</h1>,
});

const forms:{
    [key:string]:(setOpen:Dispatch<SetStateAction<boolean>>,  type:"create" | "update" | "delete", data?:any, id?:string ) => JSX.Element;
} = {
    teacher: (setOpen, type, id) => <TeacherForm type={type} id={id} setOpen={setOpen}/>,
    student: (setOpen, type, id) => <StudentForm type={type} id={id} setOpen={setOpen}/>,
    subject: (setOpen, type, id) => <SubjectForm type={type} id={id} setOpen={setOpen}/>,
    grade: (setOpen, type, data) => <GradeForm type={type} data={data} setOpen={setOpen}/>

}


const FormModal = ({table,type,data,id}:{
    table:
    | "teacher"
    | "student"
    | "subject"
    | "grade";
    
    type: "create" | "update" | "delete";
    data?: any;
    id?: string;
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

        return type === "create" || type === "update" || type === "delete" ?(
            forms[table](setOpen, type, id)
        ): (
            "Form not found!"
        )
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
            
            </div>
        )}

    </>
  
}

export default FormModal;