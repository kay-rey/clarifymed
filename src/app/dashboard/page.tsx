import { AppSidebar } from "@/components/AppSidebar";
import { Chat } from "@/components/chat";
import Logout from "@/components/Logout";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

const Dashboard = () => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<div className="ml-auto">
						<Logout />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">
					<div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
						<Chat />
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default Dashboard;
