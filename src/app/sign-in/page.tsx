"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoginImage from "../../../public/images/login-image.jpg";

const SignIn = () => {
  return (
    <div className="container relative grid h-screen flex-col items-center justify-center md:max-w-none md:grid-cols-2 md:px-0">
      <div className="relative hidden h-full flex-col justify-end bg-muted p-10 text-white dark:border-r md:flex">
        <div className="absolute inset-0 bg-zinc-900 object-contain">
          <Image
            src={LoginImage}
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
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <Button onClick={() => signIn("google")}>SignIn</Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
