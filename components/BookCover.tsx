import { cn } from "@/lib/utils";
import React from "react";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "w-[28.95px] h-10",
  small: "w-[55px] h-[76px]",
  medium: "w-[144px] h-[199px]",
  regular: "xs:w-[174px] w-[114px] xs:h-[239px] h-[169px]",
  wide: "xs:w-[296px] w-[256px] xs:h-[404px] h-[354px]",
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverUrl: string;
}

const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverUrl = "https://placeholder.co/400x600.png",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant]
      )}
    >
      BookCover
    </div>
  );
};

export default BookCover;
