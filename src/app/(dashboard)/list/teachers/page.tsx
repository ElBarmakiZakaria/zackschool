import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { currentUser } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { Prisma, StudentSubjects, Subjects, Teachers, TeacherSubjects } from "@prisma/client"
import { Eye, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


type TeacherList = Teachers & {
  TeacherSubjects: (TeacherSubjects[] & {
    Subjects: Subjects; // Include the related Subjects model
  })[];
};



const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "UserName",
    accessor: "username",
    className: "hidden md:table-cell",
  },
  {
    header: "Grades",
    accessor: "grades",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Email",
    accessor: "email",
    className: "hidden lg:table-cell",
  },
  {
    header: "Status",
    accessor: "status",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];


const renderRow = (item: TeacherList) => (
  <tr key={item.teacher_id} className="border-gray-200 even:bg-slate-100 text-sm hover:bg-lamaPurpleLight">
    <td className="flex items-center gap-4 p-4">
      <div className="md:hidden xl:block w-10 h-10 rounded-full">
        <Image src={
                    item.profile_img && item.profile_img !== "null"
                      ? item.profile_img
                      : "/avatar.png"
                  } 
                  alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover"/>
      </div>

      <div className="flex flex-col">
        <h3 className="font-semibold">{item.first_name} {item.surname}</h3>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.username}</td>

    <td className="hidden md:table-cell">
      {item.TeacherSubjects && item.TeacherSubjects.length > 0
        ? item.TeacherSubjects
        .map((subjectRelation) =>
             `${subjectRelation.Subjects?.grade_id}(${subjectRelation.Subjects?.subject_name})`
          ).join(', ')
        : "---"}
    </td>

    <td className="hidden md:table-cell">{item.phone_number}</td>
    <td className="hidden md:table-cell">{item.email}</td>
        
    {item.status ? (
      <td className="hidden md:table-cell text-green-500 font-semibold">Active</td>
    ) : (
      <td className="hidden md:table-cell text-red-500 font-semibold">Inactive</td>
    )}

    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${item.teacher_id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-700">
            <Eye width={16} height={16} color="white" />
          </button>
        </Link>

        <FormModal table="teacher" type="delete" id={item.teacher_id}/>
        
        {/* <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-500">
          <MessageCircle width={16} height={16} color="white" />
        </button> */}
        <FormModal table="teacher" type="update" id={item.teacher_id} />

      </div>
    </td>
  </tr>
);

const TeacherList = async ({
  searchParams
}:{
  searchParams: { [key: string]: string  | undefined};
}) => {

  const user = await currentUser();
  //const role = user?.publicMetadata.role as string;  this is to extract role of the user|| for now it is not needed cuz there is only one role

  const { page, ...queryParams } = searchParams;
  
  const p = page ? parseInt(page) : 1;

  // URL PARAMS OCNDITION
  const query: Prisma.TeachersWhereInput = {}

  if(queryParams){
    for (const [Key, value] of Object.entries(queryParams)){
      if (value !== undefined) {
        switch(Key){
          case "studentId":
            query.TeacherSubjects = 
              {
                some: {
                  Subjects:{
                    StudentSubjects : {
                      some: {
                        Students : {
                            student_id: queryParams.studentId!
                        }
                      }
                    }
                  }
                }
              };
          break;
          case "search":
            query.first_name = {contains:value, mode:"insensitive"}
        }

      }
    }
  }

  const [data, count] = await prisma.$transaction([

    prisma.teachers.findMany({
      where: query,
      include:{
        TeacherSubjects:{
          include:{
            Subjects: true,
          }
        }
        
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * ( p - 1 ),
    }),

    prisma.teachers.count({where:query}),

  ]);



  



  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold" >All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">

            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>

            <FormModal table="teacher" type="create" />
          
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={(item) => renderRow(item)} data={data}/>

      {/* PAGINATION */}
      <Pagination page={p} count={count}/>
      
    </div>
  )
}

export default TeacherList