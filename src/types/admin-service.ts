import type { IService, ServiceStatus } from "@/types/service";

/** Service document as returned by the admin services API. */
export interface IAdminService extends IService {
  _id: string;
  status: ServiceStatus;
  postedAt: string;
}
