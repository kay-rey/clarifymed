import { auth0 } from "@/lib/auth0";
import "./globals.css";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Home() {
	// Fetch the user session
	const session = await auth0.getSession();

	// If session exists, redirect users to dashboard
	if (session) {
		redirect("/dashboard");
	}

	// If no session, show sign-up and login buttons
	return (
		<main className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6">
			{/* Decorative elements - subtle background shapes */}
			<div className="bg-primary/5 absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full" />
			<div className="bg-secondary/5 absolute bottom-0 left-0 h-80 w-80 -translate-x-1/3 translate-y-1/3 rounded-full" />

			<div className="z-10 flex w-full max-w-md flex-col items-center space-y-14">
				{/* Logo and Project Name/Description */}
				<div className="flex flex-col items-center space-y-2">
					{/* Logo */}
					<div className="relative mb-1 h-32 w-32">
						<Image
							src="/logo.png"
							alt="ClarifyMed Logo"
							fill
							priority
							className="object-contain"
						/>
					</div>

					{/* Name and Tagline */}
					<div className="space-y-2 text-center">
						<h1 className="text-primary text-5xl font-bold tracking-tight">
							ClarifyMed
						</h1>
						<p className="text-muted-foreground text-lg">
							Simplifying healthcare communication
						</p>
					</div>
				</div>

				{/* Authentication Buttons */}
				<div className="mt-4 flex w-full flex-col space-y-4">
					<a href="/auth/login?screen_hint=signup" className="w-full">
						<button className="bg-primary text-primary-foreground hover:bg-primary/90 group w-full cursor-pointer rounded-xl px-4 py-3.5 font-medium shadow-md transition-all hover:shadow-lg">
							<span className="flex items-center justify-center">
								<span>Get Started</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M14 5l7 7m0 0l-7 7m7-7H3"
									/>
								</svg>
							</span>
						</button>
					</a>

					<a href="/auth/login" className="w-full">
						<button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 flex w-full cursor-pointer items-center justify-center rounded-xl px-4 py-3.5 font-medium shadow-md transition-all hover:shadow-lg">
							<span>Log in</span>
						</button>
					</a>
				</div>

				{/* Footer */}
				<div className="mt-10 text-center">
					<p className="text-muted-foreground text-xs">
						© {new Date().getFullYear()} ClarifyMed • Made with 💚 for AI
						Hackfest 2025
					</p>
				</div>
			</div>
		</main>
	);
}
