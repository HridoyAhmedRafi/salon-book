import { AccountDetailsCard } from "@/components/dashboard/customer-dashboard/AccountDetailsCard";
import { CustomerProfileForm } from "@/components/dashboard/customer-dashboard/CustomerProfileForm";
import { DashboardPageHeader } from "@/components/dashboard/shared/DashboardPageHeader";
import { auth } from "@/lib/auth";
import { IProfileUser } from "@/types/profile";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user?.id) {
    redirect("/sign-in");
  }

  const profile: IProfileUser = {
    name: user.name ?? "",
    email: user.email ?? "",
    image: user.image ?? null,
    role: user.role ?? "customer",
    isBlocked: user.isBlocked ?? false,
    createdAt: new Date(user.createdAt).toISOString(),
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <DashboardPageHeader
        eyebrow="Account"
        title="My profile"
        description="Keep the details we use for your appointments up to date. Your email and account status are managed by the salon."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem]">
        <CustomerProfileForm user={profile} />

        <div className="space-y-6">
          <AccountDetailsCard user={profile} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
