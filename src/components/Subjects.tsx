import { subjectDatePerStudent } from "@/lib/data";
import Table from "./Table"
import { Edit } from "lucide-react";


type Subjects = {
    subject:string;
    enrolmentDate:string;
    price:string;
    teacher:string;
  }

const columns = [
    {
      header: "Subject",
      accessor: "subject",
      className: "border border-gray-100 p-2", 
    },
    {
      header: "Enrolment date",
      accessor: "enrolment",
      className: "border border-gray-100 p-2",
    },
    {
      header: "Price",
      accessor: "price",
      className: "border border-gray-100 p-2",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "border border-gray-100 p-2",
    },
    
  ];




const Subjects = ({
    studentid,
}:{
    studentid: any
}) => {
    const renderRow = (item:Subjects) => (
    <tr key={item.subject} className="border border-gray-100 even:bg-slate-100 text-sm hover:bg-lamaPurpleLight ">
    
      <td className="border border-gray-100 p-2">{item.subject}</td>
      <td className="border border-gray-100 p-2">{item.enrolmentDate}</td>
      <td className="border border-gray-100 p-2">{item.price}</td>
      <td className="border border-gray-100 p-2">{item.teacher}</td>
      
    </tr>
    );



  return (
    <div>
      <div className="flex flex-row justify-between">
        <div>student {studentid} subjects</div>
        <Edit />
        </div>
        
    <Table columns={columns} renderRow={renderRow} data={subjectDatePerStudent}/>

        
    </div>


  )
}

export default Subjects;