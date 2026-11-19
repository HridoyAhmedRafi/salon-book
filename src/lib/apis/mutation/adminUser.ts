// block or unblock a customer from the admin dashboard
export const setUserBlocked = async (userId: string, isBlocked: boolean) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${userId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isBlocked }),
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message ?? "Could not update this customer.");
  }
  return result;
};
