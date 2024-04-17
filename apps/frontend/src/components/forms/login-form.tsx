"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, LoginSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";
import routes from "@/lib/api/routes";
import { Alert, AlertDescription } from "../ui/alert";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const { formState: { isSubmitting, errors }, ...form } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    routes.auth.login.request({ body: data })
      .then(() => {
        router.refresh();
      })
      .catch(() => {
        form.setError("root", { message: "Invalid credentials" });
      });
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        {errors.root && (
          <Alert variant="destructive">
            <AlertDescription>
              {errors.root.message}
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className={cn(errors.email && "text-destructive")} htmlFor="email">Email</Label>
              <Input
                {...form.register("email")}
                id="email"
                type="email"
                placeholder="example@adonext.com"
              />
              {
                errors.email &&
                (<p className="text-[0.8rem] font-medium text-destructive">{errors.email.message}</p>)
              }
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label className={cn(errors.password && "text-destructive")} htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input {...form.register("password")} id="password" type="password" placeholder="Password" />
              {
                errors.password &&
                (<p className="text-[0.8rem] font-medium text-destructive">{errors.password.message}</p>)
              }
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
