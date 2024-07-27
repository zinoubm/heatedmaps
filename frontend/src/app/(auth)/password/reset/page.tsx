"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import useAuth from "@/lib/api/useAuth";

const formSchema = z.object({
  email: z.string().email(),
});

type Props = {};

const ResetPasswordForm = (props: Props) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const { resetPassword } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: { email: string }) {
    await resetPassword(values.email);
    setIsDisabled(true);
    setCountdown(60);
  }

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer); // Cleanup the timer
    } else if (countdown === 0 && isDisabled) {
      setIsDisabled(false);
    }
  }, [countdown, isDisabled]);

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="font-bold text-2xl">Reset Password</h1>
      <p>Please enter your email to recover your account.</p>

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

          <Button
            className="rounded-md focus:text-white my-2"
            variant="cta"
            disabled={isDisabled}
            type="submit"
          >
            Reset password {countdown > 0 && countdown}
          </Button>
        </form>
      </Form>
      <div className="p-2 font-light text-sm text-slate-600 space-x-2">
        <Link href="/sign-in">Back to Sign In &rarr;</Link>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
