import type * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,

  SidebarGroupLabel,
  SidebarHeader,

  SidebarRail,
} from "@/components/ui/sidebar"
import Logout from "./Logout"

// This is sample data.
const data = {
  navMain: [
   {
    title: "Dashboard",
   }
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        
        <div>Hello</div>
      </SidebarHeader>
      <SidebarContent>
        
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
        
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <Logout />
      </SidebarFooter>
    </Sidebar>
  )
}
