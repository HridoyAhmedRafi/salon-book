import { getAppointmentByUserId } from "@/lib/apis/get/appointment";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const CustomerDashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user;
  if (!user?.id) {
    return;
  }
  console.log(user?.id);

  const result = await getAppointmentByUserId(user?.id);
  console.log(result);

  return <div>customer dashboard</div>;
};

export default CustomerDashboard;
