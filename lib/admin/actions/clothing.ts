"use server";

import { db } from "@/database/drizzle";
import { clothing } from "@/database/schema";

// pushes the new items to the user facing side of the app
export const createClothing = async (params: ClothingParams) => {
  try {
    const newClothing = await db
      .insert(clothing)
      .values({
        ...params,
        availableCopies: params.totalCopies,
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
      message: "An error occurred while creating the book",
    };
  }
};
