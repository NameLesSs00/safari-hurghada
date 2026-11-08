"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAdmins,
  updateAdmin,
} from "./api";
import type { AdminListParams, CreateAdminDTO, UpdateAdminDTO } from "./types";

const adminsQueryKey = ["admin", "admins"] as const;

export function useAdminsQuery(params: AdminListParams) {
  return useQuery({ queryKey: [...adminsQueryKey, params], queryFn: () => getAdmins(params) });
}

export function useAdminQuery(id: number | null) {
  return useQuery({ enabled: Boolean(id), queryKey: [...adminsQueryKey, "detail", id], queryFn: () => getAdminById(id as number) });
}

export function useCreateAdminMutation() {
  const qc = useQueryClient();

  return useMutation({ mutationFn: (v: CreateAdminDTO) => createAdmin(v), onSuccess: () => qc.invalidateQueries({ queryKey: adminsQueryKey }) });
}

export function useUpdateAdminMutation() {
  const qc = useQueryClient();

  return useMutation({ mutationFn: (v: UpdateAdminDTO) => updateAdmin(v), onSuccess: () => qc.invalidateQueries({ queryKey: adminsQueryKey }) });
}

export function useDeleteAdminMutation() {
  const qc = useQueryClient();

  return useMutation({ mutationFn: (id: number) => deleteAdmin(id), onSuccess: () => qc.invalidateQueries({ queryKey: adminsQueryKey }) });
}
