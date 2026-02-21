"use client"

import Table from "./Table"
import { Edit, PlusCircle, PlusIcon } from "lucide-react";
import { selectSubjectsForStudent } from "@/lib/action";
import { useEffect, useState } from "react";
import FormModal from "./FormModal";
import { useRouter } from "next/navigation";
import { format } from "date-fns"


const columns = [
    {
      header: "Subject",
      accessor: "subject_name",
      className: "border border-gray-100 p-2", 
    },
    {
      header: "Teacher",
      accessor: "teacher_name",
      className: "border border-gray-100 p-2",
    },
    {
      header: "Assigned Date",
      accessor: "assigned_date",
      className: "border border-gray-100 p-2",
    },
    {
      header: "Total Teacher portion",
      accessor: "total_teacher_portion",
      className: "border border-gray-100 p-2",
    },
    {
      header: "Number Of Students",
      accessor: "number_student",
      className: "border border-gray-100 p-2",
    },
    {
      header: "Status",
      accessor: "status",
      className: "border border-gray-100 p-2",
    },
    {
      header: "Actions",
      accessor: "actions",
      className: "border border-gray-100 p-2",
    },
];

const SubjectsListTeacher = ({
    dataTeacher,
    dataSubjects,
}:{
    dataTeacher: any,
    dataSubjects: any[],

}) => {
    const router = useRouter();

    

    // Add a refresh function that can be called from child components
    const refreshData = () => {
        router.refresh();
    };

    return (
        <div>
            <div className="flex flex-row justify-between mb-4">
                <div>Teacher Subjects</div>
                <FormModal table="subjectListTeacher" type="create" teacherId={dataTeacher.teacher_id} refreshData={refreshData}/>
            </div>
            
            <Table 
                columns={columns} 
                data={dataSubjects} 
                renderRow={(item) => (
                    <tr key={item.subject_id} className="border border-gray-100 even:bg-slate-100 text-sm hover:bg-lamaPurpleLight">
                        <td className="border border-gray-100 p-2">{item.subject_name}</td>
                        <td className="border border-gray-100 p-2">{dataTeacher.first_name} {dataTeacher.surname}</td>
                        <td className="border border-gray-100 p-2">{format(item.assigned_date, 'dd-MM-yyyy')}</td>
                        <td className="border border-gray-100 p-2">{item.Sum_teacher_portion}</td>
                        <td className="border border-gray-100 p-2">{item.studentCount}</td>
                        <td className="border border-gray-100 p-2">{item.status ? 'Active' : 'Inactive'}</td>
                        <td className="border border-gray-100 p-2">
                            <FormModal table="subjectListTeacher" type="update" teacherId={dataTeacher.teacher_id} id={item.subject_id} refreshData={refreshData}/>
                        </td>
                    </tr>
                )}
            />
        </div>
    );
};

export default SubjectsListTeacher;