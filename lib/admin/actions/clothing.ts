"use server";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { clothing } from "@/database/schema";

// pushes the new items to the user facing side of the app
export const createClothing = async (params: ClothingParams) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const newClothing = await db
      .insert(clothing)
      .values({
        ...params,
        userId: userId,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newClothing[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating clothing.",
    };
  }
};
