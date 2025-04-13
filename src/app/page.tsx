import { auth0 } from "@/lib/auth0";
import "./globals.css";
import { redirect } from "next/navigation";

export default async function Home() {
	// Fetch the user session
	const session = await auth0.getSession();

	// If session exists, redirect users to dashboard
	if (session) {
		redirect("/dashboard");
	}

	// If no session, show sign-up and login buttons
	return (
		<main className="bg-background flex min-h-screen flex-col items-center justify-center p-6">
			<div className="flex w-full max-w-md flex-col items-center space-y-12">
				{/* Project Name/Logo */}
				<div className="space-y-3 text-center">
					<h1 className="text-primary text-5xl font-bold">ClarifyMed</h1>
					<p className="text-muted-foreground text-lg">
						Simplifying healthcare communication
					</p>
				</div>

				{/* Authentication Buttons */}
				<div className="flex w-full flex-col space-y-4">
					<a href="/auth/login?screen_hint=signup" className="w-full">
						<button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full cursor-pointer rounded-lg px-4 py-3 font-medium shadow-md transition-colors">
							Sign up
						</button>
					</a>

					<a href="/auth/login" className="w-full">
						<button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full cursor-pointer rounded-lg px-4 py-3 font-medium shadow-md transition-colors">
							Log in
						</button>
					</a>
				</div>
			</div>
		</main>
	);
}
