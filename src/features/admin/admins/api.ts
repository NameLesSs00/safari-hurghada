import { adminFetch, parseApiResponse } from "@/src/features/admin/auth/api";
import type {
  Admin,
  AdminListParams,
  CreateAdminDTO,
  UpdateAdminDTO,
  ListWrapper,
} from "./types";

export function getAdmins(params: AdminListParams = {}) {
  const qs = new URLSearchParams();

  if (params.pageNumber) qs.set("pageNumber", String(params.pageNumber));
  if (params.pageSize) qs.set("pageSize", String(params.pageSize));
  if (params.search) qs.set("search", params.search);
  if (params.sort) qs.set("sort", params.sort);

  return adminFetch(`/api/Admins?${qs.toString()}`).then(response => 
    parseApiResponse<{ success: boolean; message: string; data: Admin[] }>(response, "Unable to load admins.")
  );
}

export async function getAdminById(id: number) {
  const response = await adminFetch(`/api/Admins/${id}`);
  return parseApiResponse<{ success: boolean; message: string; data: Admin }>(response, "Unable to load admin.");
}

export async function createAdmin(payload: CreateAdminDTO) {
  const response = await adminFetch(`/api/Admins`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  return parseApiResponse<{ success: boolean; message: string; data: { id: number } }>(response, "Unable to create admin.");
}

export async function updateAdmin(payload: UpdateAdminDTO) {
  const response = await adminFetch(`/api/Admins`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  return parseApiResponse<{ success: boolean; message: string; data: Admin }>(response, "Unable to update admin.");
}

export async function deleteAdmin(id: number) {
  const response = await adminFetch(`/api/Admins/${id}`, { method: "DELETE" });
  return parseApiResponse<{ success: boolean; message: string; data?: unknown }>(response, "Unable to delete admin.");
}
