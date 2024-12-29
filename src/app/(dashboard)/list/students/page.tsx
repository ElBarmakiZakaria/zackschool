import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { role, studentsData } from "@/lib/data"
import { Eye, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Students = {
  id:number;
  name:string;
  email?:string;
  photo:string;
  phone:string;
  grade:number;
  subjects:string[];
  startDate:string;
  status:boolean;

}

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Email",
    accessor: "email",
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





const StudentList = () => {

  const renderRow = (item:Students) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">
        {/* <Image src={item.photo} alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover"/> */}
        <div className="md:hidden xl:block w-10 h-10 rounded-full">
          <h2 className="font-bold text-2xl text-center text-gray-900">{item.id}</h2>
        </div>
        
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <h4 className="text-xs text-gray-500">{item?.name}</h4>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.email}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.subjects.join(", ")}</td>
      <td className="hidden md:table-cell">{item.startDate}</td>
      {item.status ? (
        <td className="hidden md:table-cell text-green-500 font-semibold">Active</td>
      ) : (
        <td className="hidden md:table-cell text-red-500 font-semibold">Inactive</td>
      )}
      
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-700">
          <Eye width={16} height={16} color="white" />
            </button></Link>
          { role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            // <Image src="/delete.png" alt="" width={16} height={16}/>
            // </button>

            <FormModal table="student" type="delete" id={item.id}/>
            
          )}
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-500">
          <MessageCircle width={16} height={16} color="white" />
            </button>
          
        </div>
      </td>
    </tr>
  );




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
      <Table columns={columns} renderRow={renderRow} data={studentsData}/>
      {/* PAGINATION */}
      
      <Pagination />
      
    </div>
  )
}

export default StudentList;