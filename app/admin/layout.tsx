import { auth } from "@/auth";
import Sidebar from "@/components/admin/Sidebar";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  return (
    <main className="flex main-h-screen w-full flex-row">
      <Sidebar session={session} />
      <div className="flex w-[calc(100%-264px)] flex-1 flex-col bg-light-300 p-5 xs:p-10">
        <p>Header</p>
        {children}
      </div>
    </main>
  );
};

export default Layout;
