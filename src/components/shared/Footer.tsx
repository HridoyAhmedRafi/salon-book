import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4">
        {/* Main Footer */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center">
              <span className="text-2xl font-bold tracking-tight">
                Salon<span className="text-[#d2a01f]">Book</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-6 text-muted-foreground">
              Your beauty, our passion. Discover professional salon services and
              enjoy personalized beauty and self-care experiences.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/your-page"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-[#d2a01f] hover:bg-[#d2a01f] hover:text-white"
              >
                <FaFacebookF className="size-4" />
              </a>

              <a
                href="https://www.instagram.com/your-page"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-[#d2a01f] hover:bg-[#d2a01f] hover:text-white"
              >
                <FaInstagram className="size-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[#d2a01f]"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-[#d2a01f]"
                >
                  Browse Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Contact Us</h3>

            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-[#d2a01f]" />
                <span>+880 1XXXXXXXXX</span>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-[#d2a01f]" />
                <span>hello@salonbook.com</span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#d2a01f]" />
                <span>Your Salon Address, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Opening Hours</h3>

            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-[#d2a01f]" />

              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Monday – Saturday</p>
                  <p className="mt-1 text-muted-foreground">
                    10:00 AM – 8:00 PM
                  </p>
                </div>

                <div>
                  <p className="font-medium">Sunday</p>
                  <p className="mt-1 text-muted-foreground">Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-5 text-center text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-foreground">SalonBook</span>.
            All rights reserved.
          </p>

          <p>
            Designed with{" "}
            <span className="font-semibold text-[#d2a01f]">care</span> for your
            beauty.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
