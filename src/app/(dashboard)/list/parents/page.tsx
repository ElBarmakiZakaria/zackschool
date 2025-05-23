import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
//import { parentsData, role } from "@/lib/data"
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { Parents, StudentParent, Students } from "@prisma/client"
import { MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type ParentList = Parents & {
  StudentParent: (StudentParent & {
    student: Students;
  })
}

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Students",
    accessor: "student",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];


const renderRow = (item:ParentList, role: string) => (
  <tr key={item.parent_id} className="border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-lamaPurpleLight">
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.first_name} {item.surname}</h3>
        {/* <h4 className="text-xs text-gray-500">{item?.username}</h4> */}
      </div>
    </td>
    <td className="hidden md:table-cell">{item.StudentParent?.map( (studentRelation) => 
    studentRelation.student.first_name).join(", ")}</td>
    <td className="hidden md:table-cell">{item.phone_number}</td>
    <td>
      <div className="flex items-center gap-2">
        { role === "admin" && (
          // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
          // <Image src="/delete.png" alt="" width={16} height={16}/>
          // </button>
          <>
          <FormModal
                table="parent"
                type="update"
                data={item} 
                />
          <FormModal table="parent" type="delete" id={item.parent_id}/>
          </>

        )}
        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-500">
        <MessageCircle width={16} height={16} color="white" />
          </button>
      </div>
    </td>
  </tr>
);


const ParentsList = async ({
  searchParams
}:{
  searchParams: {[key: string]: string | undefined};
}) => {

  const user = await currentUser();
  const role = user?.publicMetadata.role as string;

  
  const { page, ...queryParams } = searchParams;

  const p =  page ? parseInt(page) : 1;

  const [data, count] = await prisma.$transaction([

    prisma.parents.findMany({
      include: {
        StudentParent : {
          include: {
            student: true,
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * ( p - 1 ),
    }),

    prisma.parents.count(),

  ]);


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold" >All Parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" &&  (
            //   <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            //   <Image src="/plus.png" alt="" width={14} height={14} />
            // </button>

            <FormModal table="parent" type="create"/>
          
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

export default ParentsList;