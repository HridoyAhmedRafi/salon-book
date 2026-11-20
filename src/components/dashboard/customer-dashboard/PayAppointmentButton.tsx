"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/types/payment";

export function PayAppointmentButton({ appointment }: { appointment: string }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);

      const url = await createCheckoutSession(appointment);

      window.location.href = url;
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Payment session creation failed.",
      );
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
    >
      {loading ? "Redirecting..." : "Pay now"}
    </Button>
  );
}
