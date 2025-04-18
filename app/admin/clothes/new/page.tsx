import ClothingForm from "@/components/admin/forms/ClothingForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <Button
        asChild
        className="mb-10 w-fit border border-light-300 bg-white text-xs font-medium text-dark-200 hover:bg-light-300"
      >
        <Link href={"/admin/clothes"}>Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <ClothingForm />
      </section>
    </>
  );
};

export default Page;
