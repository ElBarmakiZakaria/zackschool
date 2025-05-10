"use client"

import Table from "./Table"
import { Edit, PlusCircle, PlusIcon } from "lucide-react";
import { selectSubjectsForStudent } from "@/lib/action";
import { useEffect, useState } from "react";
import FormModal from "./FormModal";
import { useRouter } from "next/navigation";

const columns = [
    {
      header: "Subject",
      accessor: "subject_name",
      className: "border border-gray-100 p-2", 
    },
    {
      header: "Enrolment Date",
      accessor: "enrolment_date",
      className: "border border-gray-100 p-2",
    },
    {
      header: "Price",
      accessor: "price",
      className: "border border-gray-100 p-2",
    },
    {
      header: "Teacher",
      accessor: "teacher_name",
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

const SubjectsList = ({
    id,
}:{
    id: string
}) => {
    const [subjects, setSubjects] = useState<any[]>([]);
    const router = useRouter();

    const fetchSubjects = async () => {
        const studentSubjects = await selectSubjectsForStudent(id);
        if (studentSubjects) {
            setSubjects(studentSubjects.map(subject => ({
                ...subject,
                enrolment_date: subject.enrolment_date ? new Date(subject.enrolment_date).toLocaleDateString() : 'N/A',
                price: subject.price.toString() + ' MAD',
                status: subject.status ? 'Active' : 'Inactive',
                teacher_name: subject.teacher_name
            })));
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, [id]);

    // Add a refresh function that can be called from child components
    const refreshData = () => {
        fetchSubjects();
        router.refresh();
    };

    return (
        <div>
            <div className="flex flex-row justify-between mb-4">
                <div>Student Subjects</div>
                <FormModal table="subjectList" type="create" studentId={id} refreshData={refreshData}/>
            </div>
            
            <Table 
                columns={columns} 
                data={subjects} 
                renderRow={(item) => (
                    <tr key={item.subject_name} className="border border-gray-100 even:bg-slate-100 text-sm hover:bg-lamaPurpleLight">
                        <td className="border border-gray-100 p-2">{item.subject_name}</td>
                        <td className="border border-gray-100 p-2">{item.enrolment_date}</td>
                        <td className="border border-gray-100 p-2">{item.price}</td>
                        <td className="border border-gray-100 p-2">{item.teacher_name}</td>
                        <td className="border border-gray-100 p-2">{item.status}</td>
                        <td className="border border-gray-100 p-2">
                            <FormModal table="subjectList" type="update" studentId={id} id={item.subject_id} refreshData={refreshData}/>
                        </td>
                    </tr>
                )}
            />
        </div>
    );
};

export default SubjectsList;