import SignInForm from "./SignInForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (user) {
    redirect(`/dashboard/${user.role === "admin" ? "admin" : "customer"}`);
  }

  return <SignInForm />;
};

export default SignInPage;
