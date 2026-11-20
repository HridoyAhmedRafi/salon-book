import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getServerSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

export const getToken = async () => {
  const session = await getServerSession();
  if (!session || !session.session?.token) {
    redirect("/unauthorized");
  }
  return session.session.token;
};

export const requiredRole = async (role: string) => {
  const session = await getServerSession();
  if (!session || session?.user?.role !== role) {
    redirect("/unauthorized");
  }
};

// for get apis
export const getFetch = async (api: string) => {
  const token = await getToken();
  const res = await fetch(api, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 401 || res.status === 403) {
    redirect("/unauthorized");
  }
  return res;
};

// for mutation apis
export const protectedMutation = async (
  api: string,
  method: string,
  data?: unknown,
) => {
  const token = await getToken();
  const res = await fetch(api, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : null,
  });
  if (res.status === 401 || res.status === 403) {
    redirect("/unauthorized");
  }
  return res;
};
