
import { FiHome, FiFile, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { BiCube } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible";

type NavOption = {
  title: string;
  icon: React.ReactNode;
  link: string;
  isDropdown?: boolean;
}

const DashboardOptions: NavOption[] = [
  {
    title: "Live site",
    icon: <FiHome size={20} />,
    link: "/",
  },
  {
    title: "Users",
    icon: <LuUsers size={20} />,
    link: "#",
    isDropdown: true,
  },
  {
    title: "Bursary",
    icon: <FiFile size={20} />,
    link: "#",
  },
  {
    title: "Content Management System",
    icon: <BiCube size={20} />,
    link: "/studio",
  },
  {
    title: "Documentations",
    icon: <CgFileDocument size={20} />,
    link: '#'
  },
];

const UserOptions: NavOption[] = [
  {
    title: 'View All Users',
    icon: <LuUsers size={20} />,
    link: '/users'
  },
  {
    title: 'Manage Users',
    icon: <LuUsers size={20} />,
    link: '/users/manage'
  },
]

const PreferencesOptions: NavOption[] = [
  {
    title: 'Profile',
    icon: <FaRegUser size={20} />,
    link: '#'
  },
]

function AppSidebar() {
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  return (

    <>
      <Sidebar collapsible="icon">
        <SidebarContent className="bg-edge-green-dark">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xl font-bold text-edge-bg mb-2">Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="text-edge-bg">
                {DashboardOptions.map((item) => {
                  // If this is our Users item, render the dropdown instead
                  if (item.isDropdown) {
                    return (
                      <SidebarMenuItem
                        key={item.title}
                        className="text-edge-bg"
                      >
                        <Collapsible
                          open={isUsersOpen}
                          onOpenChange={setIsUsersOpen}
                        >
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="text-lg">{item.title}</span>
                              </div>
                              {isUsersOpen ? (
                                <FiChevronDown className="ml-2" size={16} />
                              ) : (
                                <FiChevronRight className="ml-2" size={16} />
                              )}
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {UserOptions.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <Link
                                      href={subItem.link}
                                      className="flex items-center gap-3"
                                    >
                                      {subItem.icon}
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      </SidebarMenuItem>
                    );
                  }
                  
                  // Otherwise render a normal menu item
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.link} className="flex items-center gap-3 p-2 rounded-md hover:bg-edge-green-secondary">
                          {item.icon}
                          <span className="text-lg">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {/* <SidebarGroup className="text-edge-bg">
            <SidebarGroupLabel className="text-xl font-bold text-edge-text mb-2">Admin</SidebarGroupLabel>
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
          </SidebarGroup> */}
        </SidebarContent>
      </Sidebar>
    </>
  );
}



export default AppSidebar;