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
    <main className="min-h-screen flex flex-col items-center justify-center bg-background p-6 relative overflow-hidden">
      {/* Decorative elements - subtle background shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary/5 translate-y-1/3 -translate-x-1/3" />
      
      <div className="w-full max-w-md flex flex-col items-center space-y-14 z-10">
        {/* Logo and Project Name/Description */}
        <div className="flex flex-col items-center space-y-2">
          {/* Logo */}
          <div className="w-32 h-32 relative mb-1">
            <Image 
              src="/logo.png" 
              alt="ClarifyMed Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
            
          {/* Name and Tagline */}
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-bold text-primary tracking-tight">
              ClarifyMed
            </h1>
            <p className="text-muted-foreground text-lg">
              Simplifying healthcare communication
            </p>
          </div>
        </div>

        {/* Authentication Buttons */}
        <div className="w-full flex flex-col space-y-4 mt-4">
          <a href="/auth/login?screen_hint=signup" className="w-full">
            <button className="w-full py-3.5 px-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg cursor-pointer group">
              <span className="flex items-center justify-center">
                <span>Get Started</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </a>

          <a href="/auth/login" className="w-full">
            <button className="w-full py-3.5 px-4 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center">
              <span>Log in</span>
            </button>
          </a>
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} ClarifyMed • Made with 💚 for AI Hackfest 2025 
          </p>
        </div>
      </div>
    </main>
  );
}
