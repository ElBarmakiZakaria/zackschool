import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { parentsData, role } from "@/lib/data"
import { MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Parent = {
  id:number;
  name:string;
  email?:string;
  phone:string;
  students:string[];
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





const ParentsList = () => {

  const renderRow = (item:Parent) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <h4 className="text-xs text-gray-500">{item?.email}</h4>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.students.join(",")}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
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
                  data={{
                    id: 1,
                    username: "paretnt Moran",
                    email: "CameronMoran@gmail.com",
                    password: "password",
                    firstName: "Dean",
                    lastName: "Guerrero",
                    phone: "+1 234 567 89",
                    address: "1234 Main St, Anytown, USA",
                    child: "zaka",
                   }}
                  />
            <FormModal table="parent" type="delete" id={item.id}/>
            </>

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
      <Table columns={columns} renderRow={renderRow} data={parentsData}/>
      {/* PAGINATION */}
      
      <Pagination />
      
    </div>
  )
}

export default ParentsList;