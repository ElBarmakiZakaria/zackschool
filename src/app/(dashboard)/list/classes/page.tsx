import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { classesData, role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { currentUser } from "@clerk/nextjs/server";
import { Grades, Prisma, Students, Subjects, Teachers, TeacherSubjects } from "@prisma/client";
import Image from "next/image";

type GradeList = Grades & {
  Students: Students[];
  Subjects: Subjects[];
};

const columns = [
  {
    header: "Grade Name",
    accessor: "name",
  },
  {
    header: "Subjects",
    accessor: "subjects",
  },
  {
    header: "No. Students",
    accessor: "students",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];


const renderRow = (item: GradeList) => (
  <tr
    key={item.grade_id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.grade_id}</td>
    <td className="hidden md:table-cell">{item.Subjects?.length ? item.Subjects.map((ts) => ts.subject_name).join(', ') : "---"}</td>
    <td className="hidden md:table-cell">{item.Students?.length ?? 0}</td>

    <td>
      <div className="flex items-center gap-2">
          <FormModal table="grade" type="update" data={item} />
      </div>
    </td>
  </tr>
);



const ClassListPage = async ({
  searchParams
}:{
  searchParams: { [key: string]: string | undefined}
}) => {

  const user = await currentUser();
  const role = user?.publicMetadata.role as string; // extracting role of users


  const { page, ...queryParams } = searchParams;
  
  const p = page ? parseInt(page) : 1;

  const query: Prisma.GradesWhereInput = {}

  if(queryParams){
    for (const [Key, value] of Object.entries(queryParams)){
          if (value !== undefined) {
            switch(Key){
              case "search":
                // query.subject_name = {contains:value, mode:"insensitive"}
              break;
            }
          }
        }
  }

const [data, count] = await prisma.$transaction([

  prisma.grades.findMany({
    where: query,
    include : {
      Students : true,
      Subjects : true,
    },
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE * ( p - 1 ),
  }),

  prisma.grades.count({where : query}),
]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            <FormModal table="grade" type="create" />
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={(item) => renderRow(item)} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count}/>
    </div>
  );
};

export default ClassListPage;