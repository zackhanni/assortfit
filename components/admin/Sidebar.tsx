"use client";

import { adminSideBarLinks } from "@/constants";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { TbHanger } from "react-icons/tb";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <div className="sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white px-5 pb-5 pt-10">
      <div>
        <div className="flex flex-row items-center gap-2 border-b border-dashed border-primary-admin/20 pb-10 max-md:justify-center">
          <TbHanger className="size-8" />
          <h1 className="text-2xl font-semibold text-primary-admin max-md:hidden">
            AssortFit
          </h1>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "flex flex-row items-center w-full gap-2 rounded-lg px-5 py-3.5 max-md:justify-center",
                    isSelected && "bg-primary-admin shadow-sm"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${
                        isSelected ? "brightness-0 invert" : ""
                      } object-contain`}
                    />
                  </div>
                  <p
                    className={cn(
                      isSelected ? "text-white" : "text-dark",
                      "text-base font-medium max-md:hidden"
                    )}
                  >
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="my-8 flex w-full flex-row gap-2 rounded-full border border-light-400 px-6 py-2 shadow-sm max-md:px-2">
        <Avatar>
          <AvatarFallback className="bg-amber-100">
            {getInitials(session?.user?.name || "XX")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">{session?.user?.name}</p>
          <p className="text-light-500 text-xs">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
