"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  forgotAdminPassword,
  loginAdmin,
  logoutAdmin,
  resetAdminPassword,
} from "./api";
import type {
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
} from "./types";

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginRequest) => loginAdmin(payload),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordRequest) =>
      forgotAdminPassword(payload),
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (payload: ResetPasswordRequest) => resetAdminPassword(payload),
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logoutAdmin(),
    onSettled: () => {
      queryClient.clear();
    },
  });
}
