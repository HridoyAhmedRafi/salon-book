"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  LoaderCircle,
  MessageSquare,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BookAppointment } from "@/lib/apis/mutation/appointment";
import { FieldError } from "@/components/shared/FieldError";
import { FormAlert } from "@/components/shared/FormAlert";

interface ServiceBookingFormProps {
  serviceId: string;
  price: number;
  duration: number;
  serviceName: string;
  serviceCategory: string;
}

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
];

const AppointmentForm = ({
  serviceId,
  price,
  duration,
  serviceName,
  serviceCategory,
}: ServiceBookingFormProps) => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");
  const [dateError, setDateError] = useState("");
  const [slotError, setSlotError] = useState("");
  const [formError, setFormError] = useState("");
  const [requesting, setRequesting] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (requesting) {
      return;
    }

    setFormError("");

    if (!user?.id) {
      toast.error("Please sign in to request an appointment.");
      router.push("/sign-in");
      return;
    }

    if (user.role !== "customer") {
      setFormError("Only customers can request an appointment.");
      return;
    }

    const nextDateError = !appointmentDate
      ? "Choose an appointment date."
      : appointmentDate < minDate
        ? "Choose today or a later date."
        : "";
    const nextSlotError = timeSlot ? "" : "Choose a time slot.";

    setDateError(nextDateError);
    setSlotError(nextSlotError);

    if (nextDateError || nextSlotError) {
      return;
    }

    const bookingData = {
      serviceId,
      serviceName,
      serviceCategory,
      customerId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      customerImage: user.image,
      appointmentDate,
      timeSlot,
      message,
      price,
    };

    setRequesting(true);

    try {
      const result = await BookAppointment(bookingData);

      if (result.ok && result.data.acknowledged === true) {
        toast.success("Appointment booked successfully!");
        router.push("/services");
        return;
      }

      if (!result.ok && result.status === 409) {
        setFormError(
          "This time slot was just booked. Please choose a different time.",
        );
        setTimeSlot("");
        toast.error("That time slot is no longer available.");
        return;
      }

      const failureMessage = result.ok
        ? "Could not send your appointment request. Please try again."
        : result.message;

      setFormError(failureMessage);
      toast.error(failureMessage);
    } catch {
      const failureMessage = "Something went wrong. Please try again.";
      setFormError(failureMessage);
      toast.error(failureMessage);
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#d2a01f]">
          Book Your Visit
        </p>

        <h2 className="text-2xl font-bold">Request Appointment</h2>

        <p className="text-sm text-muted-foreground">
          Choose your preferred date and time.
        </p>
      </div>

      {/* Service Summary */}
      <div className="mb-6 flex items-center justify-between rounded-xl bg-muted/60 p-4">
        <div>
          <p className="text-sm text-muted-foreground">Service Price</p>

          <p className="text-xl font-bold">৳{price}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">Duration</p>

          <p className="font-semibold">{duration} minutes</p>
        </div>
      </div>

      <form onSubmit={handleBooking} noValidate className="space-y-5">
        {/* Appointment Date */}
        <div className="space-y-2">
          <label
            htmlFor="appointmentDate"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <CalendarDays className="size-4 text-[#d2a01f]" />
            Appointment Date
          </label>

          <input
            id="appointmentDate"
            type="date"
            min={minDate}
            value={appointmentDate}
            disabled={requesting}
            onChange={(e) => {
              setAppointmentDate(e.target.value);
              setTimeSlot("");
              setDateError("");
              setSlotError("");
              setFormError("");
            }}
            aria-invalid={Boolean(dateError)}
            aria-describedby={dateError ? "appointmentDate-error" : undefined}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-[#d2a01f] focus:ring-2 focus:ring-[#d2a01f]/20"
          />

          <FieldError id="appointmentDate-error">{dateError}</FieldError>
        </div>

        {/* Available Time Slots */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Clock3 className="size-4 text-[#d2a01f]" />
            Available Time Slot
          </label>

          <div
            role="group"
            aria-label="Available time slots"
            aria-describedby={slotError ? "timeSlot-error" : undefined}
            className="grid grid-cols-2 gap-2"
          >
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                disabled={!appointmentDate || requesting}
                aria-pressed={timeSlot === slot}
                onClick={() => {
                  setTimeSlot(slot);
                  setSlotError("");
                  setFormError("");
                }}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  timeSlot === slot
                    ? "border-[#d2a01f] bg-[#d2a01f] text-white"
                    : "border-border bg-background hover:border-[#d2a01f] hover:text-[#d2a01f]"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          <FieldError id="timeSlot-error">{slotError}</FieldError>

          {!appointmentDate && (
            <p className="text-xs text-muted-foreground">
              Select a date first to choose a time slot.
            </p>
          )}

          {formError ? (
            <FormAlert>{formError}</FormAlert>
          ) : null}
        </div>

        {/* Additional Message */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <MessageSquare className="size-4 text-[#d2a01f]" />
            Additional Message
            <span className="text-xs font-normal text-muted-foreground">
              (Optional)
            </span>
          </label>

          <textarea
            id="message"
            rows={3}
            value={message}
            disabled={requesting}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Any special requests?"
            className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-[#d2a01f] focus:ring-2 focus:ring-[#d2a01f]/20"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!appointmentDate || !timeSlot || requesting || isPending}
          aria-busy={requesting}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#d2a01f] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b88712] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {requesting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Requesting...
            </>
          ) : (
            "Request Appointment"
          )}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
