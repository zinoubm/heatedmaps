"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/context/authStore";
import useAuth from "@/lib/api/useAuth";

const getInitials = (
  firstName: string | undefined,
  lastName: string | undefined
): string | null => {
  if (!firstName || !lastName) {
    return null;
  }
  return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
};

const AccountManagement = () => {
  const { user, setUser, reset } = useAuthStore();
  const { getCurrentUser } = useAuth();
  const router = useRouter();

  const logout = () => {
    reset();
    router.push("/sign-in");
  };

  useEffect(() => {
    const getCurrentUserEffect = async () => {
      const effectUser = await getCurrentUser();
      console.log(effectUser);

      setUser(effectUser);
    };

    getCurrentUserEffect();
  }, []);

  return (
    <div className="mt-auto w-full">
      <button className="border-2 text-light-blue p-3 w-full rounded mb-2">
        Get Life Time Deal
      </button>
      <Popover>
        <PopoverTrigger className="w-full items-center justify-center bg-light-blue text-dark-blue text-sm hover:bg-white flex p-2 rounded-sm">
          <span className="bg-black text-white p-2 font-bold mx-2 rounded-full">
            {getInitials(user?.first_name, user?.last_name)}
          </span>
          {user?.first_name} {user?.last_name}
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2">
          <Button
            className="bg-dark-blue hover:bg-light-blue hover:text-dark-blue"
            onClick={() => router.push("/")}
          >
            Home
          </Button>

          <Button
            className="bg-dark-blue hover:bg-light-blue hover:text-dark-blue"
            onClick={logout}
          >
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccountManagement;
