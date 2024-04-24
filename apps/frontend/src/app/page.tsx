import { ToggleThemeButton } from "@/components/common/toggle-theme-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-12">
      <h1 className="text-7xl md:text-9xl font-bold">
        <span className="text-[#5a46ff]">Ado</span>
        <span>next</span>
      </h1>
      <div className="flex gap-4 justify-start">
        <Image src="/next.svg" alt="Next.js Logo" className="dark:invert" width={100} height={100} />
        <Image src="/adonis.svg" alt="AdonisJS Logo" width={80} height={80} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/login" className="group">
          <Card className="h-full group-hover:-translate-y-1 transition-all">
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access to protected routes
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/register" className="group">
          <Card className="h-full group-hover:-translate-y-1 transition-all duration-75">
            <CardHeader>
              <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create an account
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard" className="group">
          <Card className="h-full group-hover:-translate-y-1 transition-all duration-75">
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Example of a dashboard page
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Card className="h-full hover:-translate-y-1 transition-all duration-75">
          <CardHeader>
            <CardTitle>Toggle theme</CardTitle>
          </CardHeader>
          <CardContent>
            <ToggleThemeButton />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
