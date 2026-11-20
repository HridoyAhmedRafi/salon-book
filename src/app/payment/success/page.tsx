import { verifyPayment } from "@/types/payment";

type Props = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

const PaymentSuccessPage = async ({ searchParams }: Props) => {
  const { session_id } = await searchParams;

  if (!session_id) {
    return <div>Invalid payment session.</div>;
  }

  let result;

  try {
    result = await verifyPayment(session_id);
  } catch {
    return <div>Unable to verify your payment. Please try again later.</div>;
  }

  if (!result.paid) {
    return <div>Payment is still processing. Please check again later.</div>;
  }

  return <div>Payment successful! Your appointment has been paid.</div>;
};

export default PaymentSuccessPage;
