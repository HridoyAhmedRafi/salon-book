import { safeRedirectPath } from "@/lib/redirect";

import SignInForm from "./SignInForm";

interface SignInPageProps {
  searchParams: Promise<{ redirect?: string | string[] }>;
}

const SignInPage = async ({ searchParams }: SignInPageProps) => {
  const { redirect } = await searchParams;

  return <SignInForm redirectTo={safeRedirectPath(redirect)} />;
};

export default SignInPage;
