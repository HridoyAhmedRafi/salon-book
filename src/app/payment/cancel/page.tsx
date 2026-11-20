import Link from "next/link";
import { XCircle, ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const PaymentCancelPage = () => {
  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <XCircle className="size-14 text-amber-500 mb-3" />
          <CardTitle className="text-2xl font-bold">
            Payment Cancelled
          </CardTitle>
          <CardDescription className="text-sm">
            Your checkout session was cancelled. No charges were made to your
            account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your appointment is still reserved and marked as{" "}
            <span className="font-semibold text-foreground">Unpaid</span>. You
            can return to your appointments dashboard whenever you are ready to
            complete payment.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 sm:flex-row justify-center">
          <Button
            className="w-full sm:w-auto"
            render={<Link href="/dashboard/customer/my-appointments" />}
          >
            <Calendar className="mr-1.5 size-4" />
            My Appointments
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            render={<Link href="/services" />}
          >
            <ArrowLeft className="mr-1.5 size-4" />
            Browse Services
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentCancelPage;
