import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import MobileMenuPanel from "./MobileMenuPanel";

const MobileMenu = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <MobileMenuPanel
      user={
        user
          ? {
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role,
            }
          : null
      }
    />
  );
};

export default MobileMenu;
