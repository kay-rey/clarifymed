import { Chat } from "@/components/chat";
import React from "react";

const page = () => {
	return (
		<div>
			Hello Dashboard bruh
			<p>
				<a href="/auth/logout">
					<button>Log out</button>
				</a>
			</p>
			<Chat />
		</div>
	);
};

export default page;
