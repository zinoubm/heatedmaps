"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAuth from "@/lib/api/useAuth";

import { GoogleLogin } from "@react-oauth/google";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z
  .object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password1: z
      .string()
      .min(8, { message: "Password must be at least 8 characters!" }),
    password2: z
      .string()
      .min(8, { message: "Password must be at least 8 characters!" }),
  })
  .refine(({ password1, password2 }) => password1 === password2, {
    message: "Passwords did not match ",
    path: ["password2"],
  });

type Props = {};

const SignUpForm = (props: Props) => {
  const [isPending, setIsPending] = useState(false);
  const { signUp, googleSignIn } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password1: "",
      password2: "",
    },
  });

  async function onSubmit(values: {
    firstName: string;
    lastName: string;
    email: string;
    password1: string;
    password2: string;
  }) {
    setIsPending(true);
    const response = await signUp({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password1: values.password1,
      password2: values.password2,
    });

    setIsPending(false);
  }

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="font-bold text-2xl m-4 sm:mt-4 mt-24">Sign Up</h1>

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
          <div className="flex flex-col xl:flex-row space-y-2 xl:space-x-2 xl:space-y-0">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frist Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
            name="password1"
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
          <FormField
            control={form.control}
            name="password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-dark-blue text-white focus:bg-primary-semi-dark focus:text-white hover:bg-primary-semi-dark"
            type="submit"
          >
            {isPending ? (
              <p className="text-white">
                Loading &nbsp;&nbsp;
                <span>
                  <img
                    className="animate-spin h-5 w-5 mr-3 inline fill-primary-dark"
                    src="/logo-icon.svg"
                  />
                </span>
              </p>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Form>
      <div className="p-2 font-light text-sm text-slate-600 space-x-2">
        <Link href="/sign-in">Already have an account?</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
