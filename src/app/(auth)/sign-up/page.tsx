import { safeRedirectPath } from "@/lib/redirect";

import SignUpForm from "./SignUpForm";

interface SignUpPageProps {
  searchParams: Promise<{ redirect?: string | string[] }>;
}

const SignUpPage = async ({ searchParams }: SignUpPageProps) => {
  const { redirect } = await searchParams;

  return <SignUpForm redirectTo={safeRedirectPath(redirect)} />;
};

export default SignUpPage;
