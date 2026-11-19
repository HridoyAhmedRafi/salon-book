import { getAppointmentByUserId } from "@/lib/apis/get/appointment";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const appointments = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  const appointments = await getAppointmentByUserId(user?.id);
  return <div>My appointments</div>;
};

export default appointments;
