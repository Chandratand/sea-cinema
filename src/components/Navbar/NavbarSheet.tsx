"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "../ui/button";

const NavbarSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} defaultOpen={false}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="w-screen">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/movies"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Movies
          </Link>
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSheet;
