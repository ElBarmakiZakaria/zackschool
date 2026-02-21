"use client"

import Image from "next/image"
import Link from "next/link"
import FormModal from "@/components/FormModal"
import { Mail, Phone, Presentation, School, User, Wallet, Wallet2Icon } from "lucide-react"
import { useState, useEffect } from "react"
import SubjectsListTeacher from "@/components/SubjectListTeacher"


interface TeacherData {
  teacher: {
    teacher_id: string;
    username: string;
    email: string;
    first_name: string;
    surname: string;
    phone_number: string;
    profile_img: string | null;
    status: boolean;
  };
  stats: {
    subjectCount: number;
    gradeCount: number;
    totalStudentCount: number;
    totalTeacherPortion: number;
    balanceForCurrentMonth: number;
  };
  subjects: any[];
  payments: any[];
}

const SingleTeacherPage = ({params}: {params: {id: string}}) => {

    const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        if (!params.id) return;

        const fetchTeacherData = async () => {
        try {
            const res = await fetch(`/api/teachers/${params.id}`);
            if (!res.ok) throw new Error("Failed to fetch teacher data");
            const data = await res.json();
            setTeacherData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchTeacherData();
    }, [params.id]);

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
    if (!teacherData) return <p className="p-4">No data found</p>;

    const { teacher, stats, subjects } = teacherData;

  return (
    <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
            {/* LEFT */}
            <div className="w-full xl:w-2/3">
            {/* TOP */}
            <div className="flex flex-col lg:flex-row gap-4">

            {/* USER INFO CARD */}
            <div className="bg-white py-6 px-4 rounded-md flex-1 flex flex-col gap-4">
                <div className="flex flex-row justify-between gap-4 items-center">
                    
                    <div className="flex flex-row gap-3 justify-center">
                    <Image src={teacher.profile_img || "/avatar.png"} alt="Teacher" width={64} height={64} className="w-16 h-16 rounded-full object-cover" />
                    
                    <div className="flex flex-col">
                        <h1 className="text-xl font-semibold">{teacher.first_name} {teacher.surname}</h1>
                        <span className="text-gray-400 text-sm">{teacher.status ? "Active" : "Inactive"}</span>
                    </div>
                    </div>


                    <FormModal table="teacher" type="update" id={teacher.teacher_id}/>
                        
                </div>

                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">

                        <div className="flex items-center gap-2">
                            <User width={14} height={14}/>
                            <span>{teacher.username}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail width={14} height={14}/>
                            <span>{teacher.email}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Phone width={14} height={14}/>
                            <span>{teacher.phone_number}</span>
                        </div>
                        
                    </div>
                </div>

            {/* SMALL CARDS */}
            <div className="flex-1 flex gap-4 justify-between flex-wrap">
                {/* CARD */}
                <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-300">
                    <Wallet2Icon width={20} height={20} color="white"/>
                </div>
                    <div className="">
                        <h1 className="text-xl font-semibold">{stats.balanceForCurrentMonth} MAD</h1>
                        <span className="text-sm text-gray-400">Current Balance</span>
                    </div>
                </div>
                {/* CARD */}
                <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-300">
                        <Wallet width={20} height={20} color="white"/>
                    </div>
                    <div className="">
                        <h1 className="text-xl font-semibold">{stats.totalTeacherPortion} MAD</h1>
                        <span className="text-sm text-gray-400">Total Earnings</span>
                    </div>
                </div>
                {/* CARD */}
                <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-300">
                    <Presentation width={20} height={20} color="white"/>
                    </div>
                    <div className="">
                        <h1 className="text-xl font-semibold">{stats.subjectCount}</h1>
                        <span className="text-sm text-gray-400">Subjects</span>
                    </div>
                </div>
                {/* CARD */}
                <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-300">
                        <School width={20} height={20} color="white"/>
                    </div>
                    <div className="">
                        <h1 className="text-xl font-semibold">{stats.gradeCount}</h1>
                        <span className="text-sm text-gray-400">Grades</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Shortcuts</h1>
                    <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                        
                        <Link className="p-3 rounded-md bg-lamaSkyLight" href={`/list/students?teacherId=${teacher.teacher_id}`}>Teacher&apos;s Students</Link>
                        <Link className="p-3 rounded-md bg-lamaSkyLight" href={`/list/subjects?teacherId=${teacher.teacher_id}`}>Teacher&apos;s Subjects</Link>
                    </div>
                </div>

            </div>

        </div>
        {/* BOTTOM */}
        <div className="flex flex-col gap-2 ">  
        <div className="bg-white rounded-md p-8 pt-4">
          {/* <SubjectsList id={studentData.student_id} /> */}
          <SubjectsListTeacher dataTeacher={teacher} dataSubjects={subjects}/>
        </div>

        <div className="mt-4 bg-white rounded-md p-4">
          
        {/* <PaymentTable id={studentData.student_id}/> */}
        
        </div>

      </div>
        
    </div>
  )
}

export default SingleTeacherPage