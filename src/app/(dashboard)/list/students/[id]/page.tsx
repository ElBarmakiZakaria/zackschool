import Announcements from "@/components/Announcements"
import Performance from "@/components/Performance"
import BigCalender from "@/components/BigCalender"
import Image from "next/image"
import Link from "next/link"
import { role } from "@/lib/data"
import FormModal from "@/components/FormModal"
//mport PaymentTable from "@/components/PaymentTable"
import { Calendar1, ChartBarBig, Mail, Phone, Presentation, School, User, Wallet } from "lucide-react"
import Subjects from "@/components/SubjectsList"
import { selectStudentForPage } from "@/lib/action"
import { format } from "date-fns"
import PaymentTable from "@/components/PaymentTable"
import SubjectsList from "@/components/SubjectsList"

const SingleStudentPage = async ({params}: {params: {id: string}}) => {
  
  const studentData = await selectStudentForPage(params.id);
  //console.log(studentData);

  if(!studentData){
    return <div>Student not found</div>
  }


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
                  <Image src="/avatar.png" alt="" width={64} height={64} className="w-16 h-16 rounded-full object-cover" />
                  
                  <div className="flex flex-col">
                    <h1 className="text-xl font-semibold">{studentData.first_name} {studentData.last_name}</h1>
                    <span className="text-gray-400 text-sm">{studentData.status ? "Active" : "Inactive"}</span>
                  </div>
                </div>


                <FormModal table="student" type="update" id={studentData.student_id}/>

                    
              </div>

              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                      
                      <div className="flex items-center gap-2">
                          <Calendar1 width={14} height={14}/>
                          <span>{format(studentData.enrolment_date, 'yyyy-MM-dd')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <Mail width={14} height={14}/>
                          <span>{studentData.email}</span>
                      </div>

                      <div className="flex items-center gap-2">
                          <Phone width={14} height={14}/>
                          <span>{studentData.phone_number}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <User width={14} height={14}/>
                          <span>{studentData.username}</span>
                      </div>
                  </div>
            </div>

            {/* SMALL CARDS */}
            <div className="flex-1 flex gap-4 justify-between flex-wrap">
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
              
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-300">
                <ChartBarBig width={20} height={20} color="white"/>
                </div>
                <div className="">
                  <h1 className="text-xl font-semibold">90%</h1>
                  <span className="text-sm text-gray-500">Attendance</span>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-300">
                <Wallet width={20} height={20} color="white"/>
                </div>
                <div className="">
                  <h1 className="text-xl font-semibold">50 MAD</h1>
                  <span className="text-sm text-gray-500">Balance</span>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">

                
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-300">
                <Presentation width={20} height={20} color="white"/>
                </div>
                <div className="">
                  <h1 className="text-xl font-semibold">{studentData.StudentSubjects?.length}</h1>
                  <span className="text-sm text-gray-500">Subjects</span>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">

                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-300">
                <School width={20} height={20} color="white"/>
                </div>
                
                <div className="">
                  <h1 className="text-xl font-semibold">{studentData.grade_id}</h1>
                  <span className="text-sm text-gray-500">Grade</span>
                </div> 
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-md h-full">
            <h1 className="text-xl font-semibold">Shortcuts</h1>
            <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
              <Link className="p-3 rounded-md bg-lamaSkyLight" href={`/list/subjects?studentId=${studentData.student_id}`}>
                Student&apos;s Lessons
              </Link>
              <Link className="p-3 rounded-md bg-lamaPurpleLight" href={`/list/teachers?studentId=${studentData.student_id}`}>
                Student&apos;s Teachers
              </Link>
              
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}

      <div className="flex flex-col gap-2 ">  
        <div className="bg-white rounded-md p-8 pt-4">
          <SubjectsList id={studentData.student_id} />
        </div>

        <div className="mt-4 bg-white rounded-md p-4">
          
        <PaymentTable id={studentData.student_id}/>
        
        </div>

      </div>
    </div>
  )
}

export default SingleStudentPage;