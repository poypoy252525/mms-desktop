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
import { useRouter } from "next/navigation";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { authSchema, AuthZod } from "@/schemas/AuthFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<AuthZod>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your credentials to proceed</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(async (data) => {
              const result = await signIn("credentials", {
                redirect: false,
                username: data.username,
                password: data.password,
              });
              if (result?.error)
                throw new Error("Error login with credentials");
              router.replace(`/dashboard`);
            })}
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  {...form.register("username")}
                  id="username"
                  type="text"
                  placeholder="username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  {...form.register("password")}
                  id="password"
                  type="password"
                  placeholder="password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                onClick={() => formRef.current?.requestSubmit()}
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
