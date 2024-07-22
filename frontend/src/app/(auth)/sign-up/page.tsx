"use client";

import React from "react";
import { z } from "zod";

export const formSchema = z
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

const SignUp = (props: Props) => {
  return <div>SignUp</div>;
};

export default SignUp;
