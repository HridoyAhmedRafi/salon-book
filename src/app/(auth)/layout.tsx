import type { ReactNode } from "react";

import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";

/**
 * Shared chrome for the auth routes. A fragment (not a wrapper element) keeps
 * the form's `flex-1` <main> a direct child of the flex-column body, so the
 * card stays centred between the navbar and the footer.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
