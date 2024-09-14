"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { H1, H3, P } from "@/components/global/typography";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import useSetup from "@/lib/api/useSetup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Url } from "next/dist/shared/lib/router/router";
import { useAppPersistStore } from "@/context/appPersistStore";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  siteName: z.string().min(2).max(24),
  siteUrl: z.string().url(),
  siteDescription: z.string(),
});

type Props = {};

const Setup = (props: Props) => {
  const [sites, setSites] = useState<any[]>([]);
  const [isPending, setIsPending] = useState(false);
  const { currentSite, setCurrentSite } = useAppPersistStore();
  const [currentSiteDetails, setCurrentSiteDetails] = useState<any>(null);
  const { addSite, getSites, getSite } = useSetup();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "mysite",
      siteUrl: "https://mysite.com",
      siteDescription: "",
    },
  });

  async function onSubmit(values: {
    siteName: string;
    siteUrl: Url;
    siteDescription: string;
  }) {
    setIsPending(true);
    const response = await addSite(
      values.siteName,
      values.siteUrl.toString(),
      values.siteDescription
    );

    setIsPending(false);
  }

  async function onValueChange(siteId: string) {
    console.log("siteid", siteId);
    setCurrentSite(Number(siteId));
  }

  useEffect(() => {
    const getSitesEffect = async () => {
      const sitesResponse = await getSites();
      setSites(sitesResponse?.data);
    };

    getSitesEffect();
  }, []);

  useEffect(() => {
    const getCurrentSiteEffect = async () => {
      if (currentSite) {
        const siteDetails = await getSite(currentSite);
        console.log(siteDetails);

        setCurrentSiteDetails(siteDetails);
      }
    };

    getCurrentSiteEffect();
  }, [currentSite]);

  return (
    <section className="px-8 md:px-24">
      <div className="flex flex-col items justify-between md:flex-row h-48 py-4 space-y-4 md:space-x-4">
        <div className="flex flex-col space-y-4">
          <H3>Select a site</H3>
          <Select onValueChange={onValueChange} value={currentSite?.toString()}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Site" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem key="key" value="12">
              just testing
            </SelectItem> */}
              {sites.map((value, index) => {
                return (
                  <SelectItem key={index} value={value?.id.toString()}>
                    {value?.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusIcon /> &nbsp; Add Site
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md w-full">
            <DialogHeader>
              <DialogTitle>Add Site</DialogTitle>
              <DialogDescription>
                Enter a valid URL to a page you want to track.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col w-full space-y-4"
                >
                  <div className="flex flex-col w-full space-y-4">
                    <FormField
                      control={form.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Site Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="siteUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Url</FormLabel>
                          <FormControl>
                            <Input placeholder="Site Url" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="siteDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Description</FormLabel>
                          <FormControl>
                            <Input placeholder="Site Description" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" size="sm" className="px-3">
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
                      <span className="flex flex-row text-white items-center">
                        <PlusIcon color="white" />
                        &nbsp; Add
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            <DialogFooter className="sm:justify-start w-full">
              <DialogClose asChild>
                <Button className="w-full" type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="my-2" />
      <H3>{currentSiteDetails?.data?.name}</H3>
    </section>
  );
};

export default Setup;
