"use client";

import type * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenuButton,
	SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();

	return (
		<Sidebar {...props}>
			<SidebarHeader className="border-sidebar-border flex flex-col items-center gap-2 border-b p-4">
				{/* Logo */}
				<div className="relative mb-2 h-24 w-24">
					<Image
						src="/logo.png"
						alt="ClarifyMed Logo"
						fill
						priority
						className="object-contain"
					/>
				</div>
				<h1 className="text-sidebar-foreground text-xl font-semibold">
					ClarifyMed
				</h1>
			</SidebarHeader>
			<SidebarContent>
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarMenuButton
							asChild
							isActive={pathname === item.url}
						>
							<Link href={item.url}>{item.title}</Link>
						</SidebarMenuButton>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
