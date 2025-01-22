
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma, StudentSubject, Subjects, Teachers } from "@prisma/client";
import Image from "next/image";

type SubjectList = Subjects & {Teacher:Teachers}



const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Price",
    accessor: "price",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "No. Student",
    accessor: "noStudents",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];


const renderRow = (item: SubjectList, role: string) => (
  <tr
    key={item.subject_id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.subject_name}</td>
    <td className="hidden md:table-cell">{item.price?.toString()} MAD</td>
    <td className="hidden md:table-cell">{item.Teacher.first_name} {item.Teacher.surname}</td>
    {/* <td className="hidden md:table-cell">{item.StudentSubject?.length || 0}</td> */}
    <td className="hidden md:table-cell">0</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="subject" type="update" data={item} />
            <FormModal table="subject" type="delete" id={item.subject_id} />
          </>
        )}
      </div>
    </td>
  </tr>
);


const SubjectListPage = async ({
  searchParams
}:{
  searchParams: { [key: string]: string  | undefined};
}) => {
  
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;

  console.log(role);

  const { page, ...queryParams } = searchParams;
  
  const p = page ? parseInt(page) : 1;

  // URL PARMS CONDITION
  
    const query: Prisma.SubjectsWhereInput = {}
  
    if(queryParams){
      for (const [Key, value] of Object.entries(queryParams)){
            if (value !== undefined) {
              switch(Key){
                case "teacherId":
                  query.teacher_id = parseInt(queryParams.teacherId!)
                break;
                // case "studentId":
                //   query.StudentSubject = {
                //     some: {
                //       student_id: parseInt(queryParams.studentId!)
                //     }
                //   }
                // break;
  
                
                case "search":
                  query.subject_name = {contains:value, mode:"insensitive"}
                break;
              }
            }
          }
    }

  const [data, count] = await prisma.$transaction([

    prisma.subjects.findMany({
      where: query,
      include: {
        Teacher: true,
        
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * ( p - 1 ),
    }),

    prisma.subjects.count({where:query}),
  ]);


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="subject" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={(item) => renderRow(item, role)} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count}/>
    </div>
  );
};

export default SubjectListPage;