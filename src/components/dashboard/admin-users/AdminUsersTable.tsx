import { CalendarDays, Users } from "lucide-react";

import { StatusBadge } from "@/components/dashboard/shared/StatusBadge";
import { formatDate } from "@/lib/format";
import type { IAdminUser } from "@/types/admin-user";

import { AdminUserDetailsButton } from "./AdminUserDetailsButton";
import { BlockUserButton } from "./BlockUserButton";
import { UnblockUserButton } from "./UnblockUserButton";
import { UserAvatar } from "./UserAvatar";

export interface AdminUsersTableProps {
  users: IAdminUser[];
}

function EmptyUsers() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 text-center">
      <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Users className="size-6" />
      </span>

      <h2 className="text-lg font-semibold">No customers yet</h2>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Registered customer accounts will appear here.
      </p>
    </div>
  );
}

/**
 * Admin table of every registered customer, newest first.
 */
export function AdminUsersTable({ users }: AdminUsersTableProps) {
  if (users.length === 0) {
    return <EmptyUsers />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-4xl text-left text-sm">
          <thead className="bg-muted/50 text-[11px] tracking-wider text-muted-foreground uppercase">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">
                Customer
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Joined
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Appointments
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Account
              </th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr
                key={user._id}
                className="align-middle transition-colors hover:bg-muted/30"
              >
                {/* Customer */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <UserAvatar name={user.name} image={user.image} />

                    <div className="min-w-0">
                      <p className="max-w-56 truncate font-medium">
                        {user.name}
                      </p>
                      <p className="max-w-56 truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Joined */}
                <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                  {formatDate(user.createdAt)}
                </td>

                {/* Appointments */}
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-2 font-medium">
                    <CalendarDays className="size-4 text-muted-foreground" />
                    {user.appointmentCount}
                  </span>
                </td>

                {/* Account status */}
                <td className="px-5 py-4">
                  <StatusBadge tone={user.isBlocked ? "danger" : "success"}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </StatusBadge>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                    <AdminUserDetailsButton user={user} />

                    {user.isBlocked ? (
                      <UnblockUserButton user={user} />
                    ) : (
                      <BlockUserButton user={user} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
