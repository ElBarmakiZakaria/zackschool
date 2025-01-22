import Announcements from "@/components/Announcements"
import Performance from "@/components/Performance"
import BigCalender from "@/components/BigCalender"
import Image from "next/image"
import Link from "next/link"
import { role } from "@/lib/data"
import FormModal from "@/components/FormModal"
import PaymentTable from "@/components/PaymentTable"
import { Calendar1, ChartBarBig, Mail, Phone, Presentation, School, User, Wallet } from "lucide-react"
import Subjects from "@/components/Subjects"

const SingleStudentPage = () => {
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
                    <h1 className="text-xl font-semibold">Cameron Moran</h1>
                    <span className="text-gray-400 text-sm">Active</span>
                  </div>
                </div>


                  {role === "admin" && <FormModal
                    table="student"
                    type="update"
                    data={{
                      id: 1,
                      username: "Cameron Moran",
                      email: "CameronMoran@gmail.com",
                      password: "password",
                      firstName: "Dean",
                      lastName: "Guerrero",
                      phone: "+1 234 567 89",
                      address: "1234 Main St, Anytown, USA",
                      bloodType: "A+",
                      dateOfBirth: "2000-01-01",
                      sex: "male",
                      img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
                    }}
                    />}
                    
              </div>

              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                      
                      <div className="flex items-center gap-2">
                          <Calendar1 width={14} height={14}/>
                          <span>january 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <Mail width={14} height={14}/>
                          <span>user@gmail.com</span>
                      </div>

                      <div className="flex items-center gap-2">
                          <Phone width={14} height={14}/>
                          <span>+212 624545654</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <User width={14} height={14}/>
                          <span>Mohamed</span>
                      </div>
                  </div>

              {/* <div className="w-2/3 flex flex-col justify-between gap-4">
                <div className="flex items-center gap-4 justify-between">
                  <div className="flex flex-row gap-4">
                  
                  </div>
                    
                </div>
                  
                  
              </div> */}
            </div>

            {/* SMALL CARDS */}
            <div className="flex-1 flex gap-4 justify-between flex-wrap">
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
                {/* <Image
                  src="/singleAttendance.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                /> */}
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
                {/* <Image
                  src="/singleBranch.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                /> */}
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
                {/* <Image
                  src="/singleLesson.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                /> */}
                
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-300">
                <Presentation width={20} height={20} color="white"/>
                </div>
                <div className="">
                  <h1 className="text-xl font-semibold">18</h1>
                  <span className="text-sm text-gray-500">Lessons</span>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[46%]">
                {/* <Image
                  src="/singleClass.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                /> */}
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-300">
                <School width={20} height={20} color="white"/>
                </div>
                
                <div className="">
                  <h1 className="text-xl font-semibold">6A</h1>
                  <span className="text-sm text-gray-500">Class</span>
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
              <Link className="p-3 rounded-md bg-lamaSkyLight" href={`/list/subjects?studentId=${4}`}>
                Student&apos;s Lessons
              </Link>
              <Link className="p-3 rounded-md bg-lamaPurpleLight" href={`/list/teachers?studentId=${4}`}>
                Student&apos;s Teachers
              </Link>
              <Link className="p-3 rounded-md bg-lamaPurpleLight" href={`/list/parents?studentId=${4}`}>
                Student&apos;s Parent
              </Link>
              
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}

      <div className="flex flex-col gap-2 ml-6 mr-6">  
        <div className="bg-white rounded-md p-8 pt-4">
          <Subjects studentid="Cameron Moran" />
        </div>

        <div className="mt-4 bg-white rounded-md p-4">
          
        <PaymentTable name="Cameron Moran" />
        
        </div>


        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
            <h1>Student&apos;s Schedule</h1>
            <BigCalender />
        </div>
      </div>
    </div>
  )
}

export default SingleStudentPage;