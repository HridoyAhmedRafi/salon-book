import Link from "next/link";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { verifyPayment } from "@/types/payment";
import { RetryButton } from "@/components/shared/RetryButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type Props = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

const PaymentSuccessPage = async ({ searchParams }: Props) => {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="flex flex-col items-center">
            <AlertCircle className="size-12 text-destructive mb-2" />
            <CardTitle className="text-xl">Invalid Payment Session</CardTitle>
            <CardDescription>
              We could not find a valid payment session ID.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button
              render={<Link href="/dashboard/customer/my-appointments" />}
            >
              Go to My Appointments
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  let result: { paid: boolean; message: string } | null = null;
  let verificationError: string | null = null;

  try {
    result = await verifyPayment(session_id);
  } catch (error) {
    verificationError =
      error instanceof Error
        ? error.message
        : "Unable to verify your payment. Please check your appointments.";
  }

  if (verificationError || !result?.paid) {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="flex flex-col items-center">
            <Clock className="size-12 text-amber-500 mb-2" />
            <CardTitle className="text-xl">Payment Processing</CardTitle>
            <CardDescription>
              {result?.message ||
                verificationError ||
                "Your payment is still being processed. Please check back shortly."}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              render={<Link href="/dashboard/customer/my-appointments" />}
            >
              Check My Appointments
            </Button>

            <RetryButton label="Check again" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <CheckCircle2 className="size-14 text-emerald-500 mb-3" />
          <CardTitle className="text-2xl font-bold">
            Payment Confirmed!
          </CardTitle>
          <CardDescription className="text-sm">
            Thank you for your payment. Your appointment is confirmed and marked
            as Paid.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted/60 p-4 text-xs text-muted-foreground">
            Transaction session:{" "}
            <span className="font-mono text-foreground">
              {session_id.slice(0, 16)}...
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 sm:flex-row justify-center">
          <Button
            className="w-full sm:w-auto"
            render={<Link href="/dashboard/customer/my-appointments" />}
          >
            View My Appointments
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
