import Link from "next/link";
import NavbarSheet from "./NavbarSheet";
import { buttonVariants } from "@/components/ui/button";

function Navbar() {
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="container flex h-16 items-center">
          <p className="font-bold">Sea Cinema</p>
          <div className="ml-auto sm:hidden">
            <NavbarSheet />
          </div>
          <nav className="mx-6 hidden flex-1 items-center justify-end space-x-4 sm:flex lg:space-x-6">
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
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
