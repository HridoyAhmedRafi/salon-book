"use client";

import { useState } from "react";
import { CalendarDays, Clock3, MessageSquare } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BookAppointment } from "@/lib/apis/mutation/appointment";

interface ServiceBookingFormProps {
  serviceId: string;
  price: number;
  duration: number;
  serviceName: string;
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
}: ServiceBookingFormProps) => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");
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
    if (!user?.id) {
      router.push("/sign-in");
      return;
    }
    const bookingData = {
      serviceId,
      serviceName,
      customerId: user?.id,
      customerName: user?.name,
      customerEmail: user?.email,
      customerImage: user?.image,
      appointmentDate,
      timeSlot,
      message,
      price,
    };

    try {
      const result = await BookAppointment(bookingData);

      if (result.acknowledged === true) {
        toast.success("Appointment booked successfully!");
        router.push("/services");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong!");
      }
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

      <form onSubmit={handleBooking} className="space-y-5">
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
            onChange={(e) => {
              setAppointmentDate(e.target.value);
              setTimeSlot("");
            }}
            required
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-[#d2a01f] focus:ring-2 focus:ring-[#d2a01f]/20"
          />
        </div>

        {/* Available Time Slots */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Clock3 className="size-4 text-[#d2a01f]" />
            Available Time Slot
          </label>

          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                disabled={!appointmentDate}
                onClick={() => setTimeSlot(slot)}
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

          {!appointmentDate && (
            <p className="text-xs text-muted-foreground">
              Select a date first to choose a time slot.
            </p>
          )}
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
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Any special requests?"
            className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-[#d2a01f] focus:ring-2 focus:ring-[#d2a01f]/20"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!appointmentDate || !timeSlot}
          className="cursor-pointer w-full rounded-lg bg-[#d2a01f] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b88712] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Request Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
