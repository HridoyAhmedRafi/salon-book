"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/types/payment";

export function PayAppointmentButton({ appointment }: { appointment: string }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const result = await createCheckoutSession(appointment);

      if (!result.ok) {
        toast.error(result.message);
        return;
      }

      window.location.assign(result.data);
    } catch {
      toast.error("Could not start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      className="h-8 px-3"
      onClick={handlePay}
      disabled={loading}
      aria-busy={loading}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : null}
      {loading ? "Redirecting..." : "Pay now"}
    </Button>
  );
}
