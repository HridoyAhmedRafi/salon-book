import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "cn";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
const signUpClass = cn(
  buttonVariants({ variant: "ghost" }),
  "hover:bg-primary/10 hover:text-foreground dark:hover:bg-primary/10 dark:hover:text-foreground",
);

const SessionButton = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user;

  return (
    <>
      {user ? (
        <Button>Sign Out</Button>
      ) : (
        <>
          <Link
            href="/sign-up"
            className={`${signUpClass} hidden sm:inline-flex`}
          >
            Sign Up
          </Link>

          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        </>
      )}
    </>
  );
};

export default SessionButton;
