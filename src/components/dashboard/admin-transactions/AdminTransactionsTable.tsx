import { ReceiptText } from "lucide-react";

import {
  StatusBadge,
  type StatusTone,
} from "@/components/dashboard/shared/StatusBadge";
import { formatDate, formatPrice } from "@/lib/format";
import type { IAdminTransaction } from "@/types/admin-transaction";

export interface AdminTransactionsTableProps {
  transactions: IAdminTransaction[];
}

function getInitial(name?: string) {
  return name?.trim().charAt(0).toUpperCase() || "U";
}

/** Shows the start and end of a Stripe session id so the column stays narrow. */
function shortenSessionId(sessionId?: string) {
  if (!sessionId) return "—";
  if (sessionId.length <= 18) return sessionId;

  return `${sessionId.slice(0, 10)}…${sessionId.slice(-6)}`;
}

function getStatusTone(status?: string): StatusTone {
  switch ((status ?? "").toLowerCase()) {
    case "paid":
    case "succeeded":
      return "success";
    case "pending":
    case "unpaid":
      return "warning";
    case "failed":
    case "refunded":
      return "danger";
    default:
      return "neutral";
  }
}

function EmptyTransactions() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 text-center">
      <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <ReceiptText className="size-6" />
      </span>

      <h2 className="text-lg font-semibold">No transactions yet</h2>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Successful Stripe payments will appear here once a customer completes
        checkout.
      </p>
    </div>
  );
}

/**
 * Admin table of every recorded transaction, newest first.
 */
export function AdminTransactionsTable({
  transactions,
}: AdminTransactionsTableProps) {
  if (transactions.length === 0) {
    return <EmptyTransactions />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-6xl text-left text-sm">
          <thead className="bg-muted/50 text-[11px] tracking-wider text-muted-foreground uppercase">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">
                Customer
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Service
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Appointment
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Amount
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Currency
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Stripe session
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Status
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Transaction date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {transactions.map((transaction) => (
              <tr
                key={transaction._id}
                className="align-middle transition-colors hover:bg-muted/30"
              >
                {/* Customer */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                    >
                      {getInitial(transaction.customerName)}
                    </span>

                    <div className="min-w-0">
                      <p className="max-w-48 truncate font-medium">
                        {transaction.customerName || "Unknown customer"}
                      </p>
                      <p className="max-w-48 truncate text-xs text-muted-foreground">
                        {transaction.customerEmail || "—"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Service */}
                <td className="px-5 py-4">
                  <p className="max-w-52 truncate font-medium">
                    {transaction.serviceName || "—"}
                  </p>
                </td>

                {/* Appointment date */}
                <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                  {formatDate(transaction.appointmentDate)}
                </td>

                {/* Amount */}
                <td className="px-5 py-4 font-semibold whitespace-nowrap">
                  {formatPrice(Number(transaction.amount) || 0)}
                </td>

                {/* Currency */}
                <td className="px-5 py-4">
                  <span className="inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {transaction.currency || "BDT"}
                  </span>
                </td>

                {/* Stripe session reference */}
                <td className="px-5 py-4">
                  <span
                    title={transaction.stripeSessionId}
                    className="font-mono text-xs text-muted-foreground"
                  >
                    <span aria-hidden>
                      {shortenSessionId(transaction.stripeSessionId)}
                    </span>
                    <span className="sr-only">
                      {transaction.stripeSessionId}
                    </span>
                  </span>
                </td>

                {/* Payment status */}
                <td className="px-5 py-4">
                  <StatusBadge tone={getStatusTone(transaction.status)}>
                    {transaction.status || "Unknown"}
                  </StatusBadge>
                </td>

                {/* Transaction date */}
                <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                  {formatDate(transaction.transactionDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
