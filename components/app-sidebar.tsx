import { FiFile, FiExternalLink } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { BiCube } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type NavOption = {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const DashboardOptions: NavOption[] = [
  {
    title: "Dashboard",
    icon: <MdDashboard size={20} />,
    link: "/dashboard",
  },
  {
    title: "Live site",
    icon: <FiExternalLink size={20} />,
    link: "/",
  },
  {
    title: "Users",
    icon: <LuUsers size={20} />,
    link: "/users",
  },
  {
    title: "Bursary",
    icon: <FiFile size={20} />,
    link: "#",
  },
  {
    title: "Content Management",
    icon: <BiCube size={20} />,
    link: "/studio",
  },
  {
    title: "Documentations",
    icon: <CgFileDocument size={20} />,
    link: '/documentation',
  },
];

function AppSidebar() {
  const pathname = usePathname();
  
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarContent className="bg-edge-green-dark">
          <SidebarGroup>
            <SidebarGroupLabel className="flex justify-start items-center mt-4 mb-4 pl-2">
              <img src="/images/edgelogo.png" alt="Edge Logo" className="h-12" />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="text-edge-bg">
                {DashboardOptions.map((item) => {
                  const isActive = pathname === item.link;
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive}
                      >
                        <Link
                          href={item.link}
                          className="flex items-center gap-3 p-2 rounded-md"
                        >
                          {item.icon}
                          <span className="text-[20px]">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}

export default AppSidebar;