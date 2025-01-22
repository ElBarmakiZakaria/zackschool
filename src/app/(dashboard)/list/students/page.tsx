import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
//import { role, studentsData } from "@/lib/data"
import { currentUser } from "@clerk/nextjs/server"
import { Grades, Prisma, Students, StudentSubject, Subjects } from "@prisma/client"
import { Eye, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { format } from "date-fns"

type StudentList = Students & {
  StudentSubject: (StudentSubject[] & {
    subject: Subjects; // Include the related Subjects model
  })[];
};


const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Username",
    accessor: "username",
  },
  {
    header: "Phone",
    accessor: "phone",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Start Date",
    accessor: "startDate",
    className: "hidden md:table-cell",
  },
  {
    header: "Status",
    accessor: "status",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];


const renderRow = (item:StudentList, role: string) => (
  <tr key={item.student_id} className="border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-lamaPurpleLight">
    <td className="flex items-center gap-4 p-4">
      {/* <Image src={item.photo} alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover"/> */}
      <div className="md:hidden xl:block w-10 h-10 rounded-full">
        <h2 className="font-bold text-2xl text-center text-gray-900">{item.student_id}</h2>
      </div>
      
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.first_name} {item.last_name}</h3>
        <h4 className="text-xs text-gray-500">{item?.username}</h4>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username}</td>
    <td className="hidden md:table-cell">{item.phone_number}</td>
    <td className="hidden md:table-cell">{item.grade_id}</td>
    <td className="hidden md:table-cell">{item.StudentSubject?.map((subjectRelation) =>
    subjectRelation.subject ? subjectRelation.subject.subject_name : "Unknown Subject"
  ).join(', ')}</td>
    <td className="hidden md:table-cell">{format(item.enrolment_date, 'yyyy-MM-dd')}</td>
    {item.status ? (
      <td className="hidden md:table-cell text-green-500 font-semibold">Active</td>
    ) : (
      <td className="hidden md:table-cell text-red-500 font-semibold">Inactive</td>
    )}
    
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/students/${item.student_id}`}>
        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-700">
        <Eye width={16} height={16} color="white" />
          </button></Link>
        { role === "admin" && (
          // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
          // <Image src="/delete.png" alt="" width={16} height={16}/>
          // </button>

          <FormModal table="student" type="delete" id={item.student_id}/>
          
        )}
        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-500">
        <MessageCircle width={16} height={16} color="white" />
          </button>
        
      </div>
    </td>
  </tr>
);


const StudentList = async ({
    searchParams
  }:{
    searchParams: {[key: string]: string | undefined};
  }) => {

  const user = await currentUser();
  const role = user?.publicMetadata.role as string;


  const { page, ...queryParams } = searchParams;

  const p =  page ? parseInt(page) : 1;

  // URL PARMS CONDITION

  const query: Prisma.StudentsWhereInput = {}

  if(queryParams){
    for (const [Key, value] of Object.entries(queryParams)){
          if (value !== undefined) {
            switch(Key){
              // case "teacherId":
              //   query.StudentSubject = {
              //     some: {
              //       subject: {
              //         teacher_id: parseInt(queryParams.teacherId!)
              //       },
              //     },
              //   };
              // break;

              
              case "search":
                query.first_name = {contains:value, mode:"insensitive"}
              break;
            }
          }
        }
  }

  const [data, count] = await prisma.$transaction([
    
    prisma.students.findMany({
      where: query,
      // include:{
      //   StudentSubject: {
      //     include: {
      //       subject: true,
      //     },
      //   }
      // },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * ( p - 1),
    }),

    prisma.students.count(),

  ]);


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold" >All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
            //    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            //   <Image src="/plus.png" alt="" width={14} height={14} />
            // </button>
              
            <FormModal table="student" type="create"/>

          )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={(item) => renderRow(item, role)} data={data}/>
      {/* PAGINATION */}
      
      <Pagination page={p} count={count}/>
      
    </div>
  )
}

export default StudentList;