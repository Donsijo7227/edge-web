import { FiHome, FiFile, FiClipboard } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { BiCube } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { TbSettings } from "react-icons/tb";
import Link from "next/link";
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
    title: 'Live site',
    icon: <FiHome size={20} />,
    link: '/'
  },
  {
    title: 'Users',
    icon: <LuUsers size={20} />,
    link: '#'
  },
  {
    title: 'Bursary',
    icon: <FiFile size={20} />,
    link: '#'
  },
  {
    title: 'Forms',
    icon: <FiClipboard size={20} />,
    link: '#'
  },
  {
    title: 'Content Management System',
    icon: <BiCube size={20} />,
    link: '/studio'
  },
  {
    title: 'Documentations',
    icon: <CgFileDocument size={20} />,
    link: '#'
  },
]

const PreferencesOptions: NavOption[] = [
  {
    title: 'Profile',
    icon: <FaRegUser size={20} />,
    link: '#'
  },
  {
    title: 'Setting',
    icon: <TbSettings size={20} />,
    link: '#'
  },
]

function AppSidebar() {
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarContent className="bg-sidebar-accent">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xl font-bold text-edge-text mb-2">Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {DashboardOptions.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.link} className="flex items-center gap-3 p-2 rounded-md hover:bg-edge-green-secondary">
                        {item.icon}
                        <span className="text-lg">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup className="mt-3">
            <SidebarGroupLabel className="text-xl font-bold text-edge-text mb-2">Preferences</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {PreferencesOptions.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.link} className="flex items-center gap-3 p-2 rounded-md hover:bg-edge-green-secondary">
                        {item.icon}
                        <span className="text-lg">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}

export default AppSidebar;