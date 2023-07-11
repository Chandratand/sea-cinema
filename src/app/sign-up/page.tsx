import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import registerImage from "../../../public/images/register-image.jpg";
import SignUpForm from "./SignUpForm";
import { authOptions } from "../api/auth/[...nextauth]/route";

const SignUp = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="container relative grid h-screen flex-col items-center justify-center md:max-w-none md:grid-cols-2 md:px-0">
      <Link
        href="/sign-in"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Sign In
      </Link>
      <div className="relative hidden h-full flex-col justify-end bg-muted p-10 text-white dark:border-r md:flex">
        <div className="absolute inset-0 bg-zinc-900 object-contain">
          <Image
            src={registerImage}
            alt="Auth Image"
            priority
            fill
            className="object-cover"
          />
        </div>
        <div className="relative space-y-2">
          <h2 className="text-xl font-semibold">Sea Sinema</h2>
          <p className="text-sm font-medium">
            Enjoy an unforgettable experience watching movies at Sea Cinema,
            with the best picture and sound quality.
          </p>
        </div>
      </div>
      <div className="max-h-screen overflow-auto lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 p-2 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
