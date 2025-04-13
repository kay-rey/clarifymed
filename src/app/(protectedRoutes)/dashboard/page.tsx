import { Chat } from "@/components/chat";

const Dashboard = () => {
	return (
		<>
			<div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
				<div className="mt-20">
					<Chat />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
