import React from "react";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "./ui/alert-dialog";

export default function DisclaimerDialog({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AlertDialog>
			{children}
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Important Information</AlertDialogTitle>
					<AlertDialogDescription>
						This action uses AI to clarify medical terms. Please remember that
						the information provided is for general knowledge only and should
						not be considered medical advice. Always consult with a qualified
						healthcare professional for any health concerns.
						<br />
						<br />
						Reliance on the information provided by this app is solely at your
						own risk.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="cursor-pointer">
						I understand
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
