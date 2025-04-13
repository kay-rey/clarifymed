"use client";

import React from "react";
import { SavedNotes } from "@/components/saved-notes";

const SavedPage = () => {
	return (
		<div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
			<div className="p-10">
				<SavedNotes />
			</div>
		</div>
	);
};

export default SavedPage;
