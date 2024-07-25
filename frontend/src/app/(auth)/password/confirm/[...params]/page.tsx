"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/lib/api/useAuth";

import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

const formSchema = z.object({
  new_password1: z
    .string()
    .min(8, { message: "Password must be at least 8 characters!" }),
  new_password2: z
    .string()
    .min(8, { message: "Password must be at least 8 characters!" }),
});

type Props = {};

const ConfirmPasswordReset = (props: Props) => {
  const [isPending, setIsPending] = useState(false);
  const [id, setId] = useState("");
  const [token, setToken] = useState("");

  const router = useRouter();
  const { verifyPassowrdReset } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password1: "",
      new_password2: "",
    },
  });

  useEffect(() => {
    const pathname = window.location.pathname;
    const parts = pathname.split("/").filter((part) => part);
    const id = parts[parts.length - 2];
    const token = parts[parts.length - 1];

    setId(id);
    setToken(token);
  }, []);

  useEffect(() => {
    if (id && token) {
      console.log("your id is", id);
      console.log("your token is", token);
    }
  }, [token]);

  async function onSubmit(values: {
    new_password1: string;
    new_password2: string;
  }) {
    // const user = await signIn({
    //   email: values.email,
    //   password: values.password,
    // });
    setIsPending(true);
    await verifyPassowrdReset(
      values.new_password1,
      values.new_password2,
      id,
      token
    );
    setIsPending(false);
  }

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="font-bold text-2xl sm:mt-4 mt-24 mb-4">Reset Password</h1>
      <p>Please enter the new password.</p>

      <Separator className="w-full my-4" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full align-middle md:space-y-4"
        >
          <FormField
            control={form.control}
            name="new_password1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new_password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-dark-blue focus:bg-primary-semi-dark focus:text-white hover:bg-primary-semi-dark"
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
              "Reset password"
            )}
          </Button>
        </form>
      </Form>
      <div className="p-2 font-light text-sm text-slate-600 space-x-2">
        <Link href="/sign-in">Back to Sign In &rarr;</Link>
      </div>
    </div>
  );
};

export default ConfirmPasswordReset;
