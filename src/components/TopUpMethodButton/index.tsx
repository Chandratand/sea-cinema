"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface TopUpMethodButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  logoSrc: string;
  title: string;
}

const TopUpMethodButton = ({
  logoSrc,
  title,
  ...props
}: TopUpMethodButtonProps) => {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-2 rounded-lg border px-3 py-4 sm:gap-4"
      {...props}
    >
      <div className="relative aspect-video w-20">
        <Image
          src={logoSrc}
          alt="method-logo"
          fill
          className="object-contain"
        />
      </div>
      <p className="flex-1 text-start font-semibold">{title}</p>
      <ChevronRight />
    </button>
  );
};

export default TopUpMethodButton;
