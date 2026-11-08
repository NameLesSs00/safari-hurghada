export type AdminRole = "Admin" | "SuperAdmin" | "AdminManager" | string;

export type Admin = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: AdminRole;
  phone?: string;
  nationality?: string;
  notes?: string;
  createdAt?: string;
};

export type AdminListParams = {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
};

export type CreateAdminDTO = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  nationality?: string;
  password: string;
  notes?: string;
  role?: AdminRole;
};

export type UpdateAdminDTO = Partial<Pick<CreateAdminDTO, "firstName" | "lastName" | "phone" | "nationality" | "notes" | "role">> & {
  id: number;
};

export type ListWrapper<T> = {
  success: boolean;
  message: string;
  data: {
    items: T[];
    total: number;
    pageNumber: number;
    pageSize: number;
  };
};
