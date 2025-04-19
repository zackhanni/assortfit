"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { clothingSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { createClothing } from "@/lib/admin/actions/clothing";
import { toast } from "sonner";

interface Props extends Partial<Clothing> {
  type?: "create" | "update";
}

const ClothingForm = ({ type, ...clothing }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof clothingSchema>>({
    resolver: zodResolver(clothingSchema),
    defaultValues: {
      brand: "",
      category: "top",
      lifecycle: "new",
      colors: [],
      seasons: [],
      occasions: [],
      notes: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof clothingSchema>) => {
    console.log(values);

    const result = await createClothing(values);

    if (result.success) {
      toast("Book created successfully!");

      router.push(`/admin/books/${result.data.id}`);
    } else {
      toast(`Error - ${result.message}`);
    }
  };

  const colorsArray = [
    "red",
    "pink",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "brown",
    "black",
    "grey",
    "white",
    "beige",
  ];

  const seasonsArray = ["summer", "fall", "winter", "spring"];

  const occasionsArray = ["casual", "work", "formal", "workout", "lounge_wear"];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"brand"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Brand
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Clothing brand"
                  {...field}
                  className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"category"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Category
              </FormLabel>
              <FormControl>
                <Select required {...field}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Top" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="bottom">Bottom</SelectItem>
                    <SelectItem value="jacket">Jacket</SelectItem>
                    <SelectItem value="hat">Hat</SelectItem>
                    <SelectItem value="shoes">Shoes</SelectItem>
                    <SelectItem value="socks">Socks</SelectItem>
                    <SelectItem value="accessory">Accessory</SelectItem>
                  </SelectContent>
                </Select>
                {/* <Input
                  required
                  placeholder=""
                  {...field}
                  className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                /> */}
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"lifecycle"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Lifecycle
              </FormLabel>
              <FormControl>
                <Select required {...field}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="New" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in_use">In use</SelectItem>
                    <SelectItem value="old">Old</SelectItem>
                    <SelectItem value="replace">Replace</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"colors"}
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Colors</FormLabel>
                <FormDescription>
                  Select the colors you want to be associated with this
                  clothing.
                </FormDescription>
              </div>
              {colorsArray.map((color) => (
                <FormField
                  key={color}
                  control={form.control}
                  name="colors"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={color}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(color)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, color])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== color
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal lowercase ">
                          {color}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"colors"}
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Seasons</FormLabel>
                <FormDescription>
                  Select which season this clothing should be worn.
                </FormDescription>
              </div>
              {seasonsArray.map((season) => (
                <FormField
                  key={season}
                  control={form.control}
                  name="seasons"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={season}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(season)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, season])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== season
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal lowercase ">
                          {season}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"occasions"}
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Occasion</FormLabel>
                <FormDescription>
                  Select for which occasion this clothing should be worn.
                </FormDescription>
              </div>
              {occasionsArray.map((occasion) => (
                <FormField
                  key={occasion}
                  control={form.control}
                  name="occasions"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={occasion}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(occasion)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, occasion])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== occasion
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal lowercase ">
                          {occasion}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"imageUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Clothing Image
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload a clear image of the clothing"
                  folder={`clothes/${form.getValues().category}`}
                  variant="light"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name={"coverColor"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Primary Color
              </FormLabel>
              <FormControl>
                <ColorPicker
                  onPickerChange={field.onChange}
                  value={field.value}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name={"notes"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Notes
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Notes about the clothing"
                  {...field}
                  rows={10}
                  className="min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name={"videoUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Trailer
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="video"
                  accept="video/*"
                  placeholder="Upload a book trailer"
                  folder="clothes/videos" // change to specific clothing sub-type
                  variant="light"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button
          type="submit"
          className="min-h-14 w-full bg-primary-admin hover:bg-primary-admin/95 text-white"
        >
          Add Clothing to Collection
        </Button>
      </form>
    </Form>
  );
};

export default ClothingForm;
