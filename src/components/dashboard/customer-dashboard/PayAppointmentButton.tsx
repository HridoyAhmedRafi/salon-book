"use client";

import { Button } from "@/components/ui/button";

/**
 * Placeholder payment button.
 * The payment provider will be connected later.
 */
export function PayAppointmentButton() {
  const handlePay = () => {
    // TODO: integrate the payment provider.
    // Intentionally empty until payments are implemented.
  };

  return (
    <Button size="sm" className="h-8 px-3" onClick={handlePay}>
      Pay now
    </Button>
  );
}
