/** Aggregated admin metrics returned by the external dashboard-stats API. */
export interface IAdminDashboardStats {
  totalCustomers: number;
  activeServices: number;
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  successfulPayments: number;
}
