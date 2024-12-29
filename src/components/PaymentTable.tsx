import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { role, paymentData } from "@/lib/data"
import { Edit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type PaymentTable = {
  id:number;
  studentId:string;
  paymentDate:string;
  month:string;
  amountPaid:string;
  dueAmount:string;
  status:string;
}

const columns = [
    {
        header: "Payment Id",
        accessor: "paymentId",
        className: "border border-gray-100 p-2 bg-slate-100",
    },
  {
    header: "Student",
    accessor: "studentId",
    className: "border border-gray-100 p-2 bg-slate-100",
  },
  {
    header: "Payment Date",
    accessor: "paymentDate",
    className: "border border-gray-100 p-2 bg-slate-100",
  },
  {
    header: "Month",
    accessor: "month",
    className: "border border-gray-100 p-2 bg-slate-100",
  },
  {
    header: "Amount Paid",
    accessor: "amount",
    className: "border border-gray-100 p-2 bg-slate-100",
  },
  {
    header: "Due Amount",
    accessor: "dueAmount",
    className: "border border-gray-100 p-2 bg-slate-100",
  },
  {
    header: "Status",
    accessor: "status",
    className: "border border-gray-100 p-2 bg-slate-100",
  },

];



const PaymentTable = ({name}:{
    name: string;
}) => {

    const renderRow = (item:PaymentTable) => (
        <tr key={item.id}  className="border border-gray-100 even:bg-slate-100 text-sm hover:bg-lamaPurpleLight">
            <td className="border border-gray-100 p-2">
                {item.id}
            </td>
            <td className="border border-gray-100 p-2">
                {/* <h3 className="font-semibold text-sm">{name}</h3> */}
                <h3 className="font-semibold text-sm">{item.studentId}</h3>
            </td>
            <td className="border border-gray-100 p-2">
                {item.paymentDate}
            </td>
            <td className="border border-gray-100 p-2">{item.month}</td>
            <td className="border border-gray-100 p-2">{item.amountPaid}</td>
            <td className="border border-gray-100 p-2">{item.dueAmount}</td>
            <td className="border border-gray-100 p-2">{item.status}</td>
           
            
        </tr>
    );




  return (
    <div>
        <div className="flex flex-row justify-between">
        <div>student {name} payment table</div>
        <Edit />
        </div>
        <Table columns={columns} renderRow={renderRow} data={paymentData}/>

    </div>

    // <table className="w-full mt-4 border-collapse border border-slate-500">
    //     <thead>
    //         <tr className="text-left text-gray-500 text-sm border p-2">
    //             {columns.map((col)=>(
    //                 <th key={col.accessor}  className="border border-gray-100 p-2" >{col.header}</th>
    //             ))}
    //         </tr>
    //     </thead>
    //     <tbody>
    //         {paymentData.map((item)=>renderRow(item))}
    //     </tbody>

    // </table>
  )
}

export default PaymentTable