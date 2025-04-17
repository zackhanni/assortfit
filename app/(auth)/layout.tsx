import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import { TbHanger } from "react-icons/tb";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main className="relative flex flex-col-reverse text-light-100 sm:flex-row">
      <section className="my-auto flex h-full min-h-screen flex-1 items-start sm:items-center bg-pattern bg-cover bg-top bg-dark-100 px-5 py-10">
        <div className="gradient-vertical mx-auto flex max-w-xl flex-col gap-6 rounded-lg p-10 bg-linear-to-r from-[#12141d] to-[#12151f]">
          <div className="flex flex-row gap-3">
            {/* <Image src={"/icons/logo.svg"} alt="logo" width={37} height={37} /> */}
            <TbHanger className="size-8" />
            <h1 className="text-2xl font-semibold text-white">AssortFit</h1>
          </div>

          <div>{children}</div>
        </div>
      </section>

      <section className="sticky h-40 w-full sm:top-0 sm:h-screen sm:flex-1">
        <Image
          // src={"/images/auth-illustration.png"}
          src={"/images/woman-sitting-fashion.jpg"}
          alt="auth illustration"
          height={1000}
          width={1000}
          className="size-full object-cover object-top"
        />
      </section>
    </main>
  );
};

export default Layout;
