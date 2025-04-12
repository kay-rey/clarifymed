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
    <main className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-md flex flex-col items-center space-y-12">
        {/* Project Name/Logo */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold text-primary">ClarifyMed</h1>
          <p className="text-muted-foreground text-lg">
            Simplifying healthcare communication
          </p>
        </div>

        {/* Authentication Buttons */}
        <div className="w-full flex flex-col space-y-4">
          <a href="/auth/login?screen_hint=signup" className="w-full">
            <button className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md cursor-pointer">
              Sign up
            </button>
          </a>

          <a href="/auth/login" className="w-full">
            <button className="w-full py-3 px-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors shadow-md cursor-pointer">
              Log in
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
