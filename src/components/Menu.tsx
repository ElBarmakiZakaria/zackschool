import { role } from "@/lib/data";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/finance.png",
        label: "Payments",
        href: "/payments",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Calendar",
        href:"/calendar",
        visible: ["admin"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = async () => {


  const user = await currentUser()
  const role = user?.publicMetadata.role as string;

  return (
    <div className="text-sm mt-4">
      {menuItems.map(i=>(
        <div className="flex flex-col gap-1" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-3 ml-3">{i.title}</span>
          
          {i.items.map((item)=>{
            if(item.visible.includes(role)){
              return (
                <Link className="flex items-center md:px-2 justify-center lg:justify-start gap-4 text-gray-500 py-2 lg:ml-5 rounded-md hover:bg-lamaSkyLight" href={item.href} key={item.label}>
              <Image src={item.icon} alt="" width={25} height={25}/>
              <span className="hidden lg:block">{item.label}</span>
            </Link>
              )
            }
          })}
          
        </div>
      ))}
    </div>
  )
}

export default Menu