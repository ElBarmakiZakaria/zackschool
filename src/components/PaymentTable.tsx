"use client"

import Table from "./Table"
import { Edit, PlusCircle } from "lucide-react";
import { selectPaymentsForStudent } from "@/lib/action";
import { useEffect, useState } from "react";
import FormModal from "./FormModal";
import { useRouter } from "next/navigation";

// type Payment = {
//     payment_id: string;
//     student_id: string;
//     subject_id: string;
//     month_id: string;
//     payment_date: Date;
//     amount: Decimal;
//     subject_name: string;
//     Subjects: {
//         subject_id: string;
//         subject_name: string;
//     };
// };

const columns = [
    {
      header: "Subject Name",
      accessor: "subject_name",
      className: "border border-gray-100 p-2", 
    },
    {
      header: "Payment Date",
      accessor: "payment_date",
      className: "border border-gray-100 p-2",
    },
    {
      header: "Amount",
      accessor: "amount",
      className: "border border-gray-100 p-2",
    },
    {
      header: "Month",
      accessor: "month_id",
      className: "border border-gray-100 p-2",
    },
    {
      header: "Actions",
      accessor: "actions",
      className: "border border-gray-100 p-2",
    },
];

const PaymentTable = ({
    id,
}:{
    id: string
}) => {
    const [payments, setPayments] = useState<any[]>([]);
    const router = useRouter();

    const fetchPayments = async () => {
        const studentPayments = await selectPaymentsForStudent(id);
        if (studentPayments) {
            setPayments(studentPayments.map(payment => ({
                ...payment,
                amount: payment.amount.toString() + ' MAD',
                payment_date: payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : 'N/A',
            })));
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [id]);

    // Add a refresh function that can be called from child components
    const refreshData = () => {
        fetchPayments();
        router.refresh();
    };

    return (
        <div>
            <div className="flex flex-row justify-between mb-4">
                <div>Student Payments</div>
                <FormModal table="paymentList" type="create" studentId={id} refreshData={refreshData}/>
            </div>
            
            <Table 
                columns={columns} 
                data={payments} 
                renderRow={(item) => (
                    <tr key={item.payment_id} className="border border-gray-100 even:bg-slate-100 text-sm hover:bg-lamaPurpleLight">
                        <td className="border border-gray-100 p-2">{item.subject_name}</td>
                        <td className="border border-gray-100 p-2">{item.payment_date}</td>
                        <td className="border border-gray-100 p-2">{item.amount.toString()}</td>
                        <td className="border border-gray-100 p-2">{item.month_id}</td>
                        <td className="border border-gray-100 p-2">
                            <FormModal table="paymentList" type="update" studentId={id} id={item.payment_id} refreshData={refreshData}/>
                        </td>
                    </tr>
                )}
            />
        </div>
    );
};

export default PaymentTable;