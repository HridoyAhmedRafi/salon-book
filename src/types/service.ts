export type ServiceStatus = "active" | "inactive";

export interface IService {
  serviceName: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  image: string;
}

export interface IServicePost extends IService {
  _id: string;
  status: ServiceStatus;
  createdAt: string;
}
