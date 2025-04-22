import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id))
    .limit(1);
  return <div>page</div>;
};

export default page;
