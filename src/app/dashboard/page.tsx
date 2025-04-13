
import { Chat } from "@/components/chat";

import { SidebarLayout } from "@/components/SidebarLayout";


const Dashboard = () => {
	return (
		<SidebarLayout>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <Chat />
      </div>
    </SidebarLayout>
	);
};

export default Dashboard;
