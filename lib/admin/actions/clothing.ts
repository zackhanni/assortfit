"use server";

import { db } from "@/database/drizzle";
import { clothing } from "@/database/schema";
import { ClothingParams } from "@/types";

const createClothing = async (params: ClothingParams) => {
  try {
    const newClothing = await db.insert(clothing);
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};
