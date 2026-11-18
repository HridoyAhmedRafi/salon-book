import Link from "next/link";
import { headers } from "next/headers";

import { buttonVariants } from "../ui/button";
import { cn } from "cn";
import { auth } from "@/lib/auth";
import UserMenu from "./UserMenu";

const signUpClass = cn(
  buttonVariants({ variant: "ghost" }),
  "hover:bg-primary/10 hover:text-foreground dark:hover:bg-primary/10 dark:hover:text-foreground",
);

const SessionButton = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user;

  if (user) {
    return <UserMenu name={user.name} email={user.email} image={user.image} />;
  }

  return (
    <>
      <Link href="/sign-up" className={`${signUpClass} max-sm:hidden`}>
        Sign Up
      </Link>

      <Link href="/sign-in" className={buttonVariants()}>
        Sign In
      </Link>
    </>
  );
};

export default SessionButton;
