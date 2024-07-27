"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import useAuth from "@/lib/api/useAuth";
import Link from "next/link";

import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters!" }),
});

type Props = {};

const SignInForm = (props: Props) => {
  const [isPending, setIsPending] = useState(false);
  const { signIn, googleSignIn } = useAuth();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: { email: string; password: string }) {
    setIsPending(true);
    const response = await signIn({
      email: values.email,
      password: values.password,
    });
    setIsPending(false);
  }

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="font-bold text-2xl">Sign In</h1>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          if (credentialResponse.credential) {
            googleSignIn(credentialResponse.credential);
          } else {
            toast.error(
              "Something Went Wrong, Couldn't get Google credentials!"
            );
          }
        }}
        onError={() => {
          toast.error("Something Went Wrong, Please Try Again!");
        }}
      />

      <Separator className="w-full my-4" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full align-middle md:space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="focus:bg-primary-semi-dark focus:text-white my-2"
            variant="cta"
            type="submit"
          >
            {isPending ? (
              <p className="text-white">
                Loading &nbsp;&nbsp;
                <span>
                  <img
                    className="animate-spin h-5 w-5 mr-3 inline"
                    src="/logo-icon.svg"
                  />
                </span>
              </p>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>

      <div className="flex flex-col md:flex-row p-2 font-light text-sm text-slate-600 space-x-2">
        <Link href="/sign-up">Don&apos;t have an account?</Link>
        <Link href="/password/reset">Forgot password?</Link>
      </div>
    </div>
  );
};

export default SignInForm;
