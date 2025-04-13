import type * as React from "react"
import {
  Sidebar,
  SidebarContent,
 
  SidebarGroup,

  SidebarHeader,

  SidebarMenuButton,

  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"


// This is sample data.
const data = {
  navMain: [
   {
    title: "Dashboard",
    url: "/dashboard",
   },
   {
    title: "Saved Notes",
    url: "/saved",
   }
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-col items-center gap-2 p-4 border-b border-sidebar-border">
        {/* Logo */}
        <div className="relative h-24 w-24 mb-2">
          <Image
            src="/logo.png"
            alt="ClarifyMed Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
        <h1 className="text-xl font-semibold text-sidebar-foreground">ClarifyMed</h1>
      </SidebarHeader>
      <SidebarContent>
        
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item.url}>{item.title}</Link>
          </SidebarMenuButton>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
