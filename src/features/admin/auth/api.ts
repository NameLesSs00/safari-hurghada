import { getApiUrl } from "@/src/shared/config/api";

import {
  clearAuthSession,
  getStoredAuthSession,
  isTokenUsable,
  storeAuthSession,
} from "./storage";
import type {
  ApiProblemDetails,
  AuthSession,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  MessageResponse,
  RefreshResponse,
  ResetPasswordRequest,
} from "./types";

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

let refreshPromise: Promise<AuthSession | null> | null = null;

function getErrorMessage(body: unknown, fallback: string) {
  if (typeof body === "string") {
    return body || fallback;
  }

  if (body && typeof body === "object") {
    const problem = body as ApiProblemDetails & MessageResponse;
    return (
      problem.detail ??
      problem.title ??
      problem.message ??
      problem.Message ??
      fallback
    );
  }

  return fallback;
}

export async function parseApiResponse<T>(
  response: Response,
  fallbackError: string,
) {
  const text = await response.text();
  let body: unknown = null;

  if (text) {
    try {
      body = JSON.parse(text) as unknown;
    } catch {
      body = text;
    }
  }

  if (!response.ok) {
    throw new ApiError(getErrorMessage(body, fallbackError), response.status);
  }

  return body as T;
}

async function postJson<TResponse>(
  path: string,
  body: unknown,
  accessToken?: string,
) {
  const response = await fetch(getApiUrl(path), {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify(body),
  });

  return parseApiResponse<TResponse>(response, "Request failed.");
}

function mergeAccessToken(session: AuthSession, response: RefreshResponse) {
  const accessToken = response.data.accessToken ?? response.data.accesstoken;

  if (!accessToken) {
    throw new ApiError("Refresh response did not include an access token.", 401);
  }

  return {
    ...session,
    accessToken,
  };
}

export async function loginAdmin(payload: LoginRequest) {
  const response = await postJson<LoginResponse>("/api/Auth/login", payload);
  storeAuthSession(response.data);

  return response;
}

export async function forgotAdminPassword(payload: ForgotPasswordRequest) {
  return postJson<MessageResponse>("/api/Auth/forgot-password", payload);
}

export async function resetAdminPassword(payload: ResetPasswordRequest) {
  return postJson<MessageResponse>("/api/Auth/reset-password", payload);
}

export async function refreshAdminSession() {
  const session = getStoredAuthSession();

  if (!session?.refreshToken) {
    return null;
  }

  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = postJson<RefreshResponse>("/api/Auth/refresh", {
    refreshToken: session.refreshToken,
  })
    .then((response) => {
      const refreshedSession = mergeAccessToken(session, response);
      storeAuthSession(refreshedSession);
      return refreshedSession;
    })
    .catch(() => {
      clearAuthSession();
      return null;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

export async function ensureAdminSession() {
  const session = getStoredAuthSession();

  if (!session) {
    return null;
  }

  if (isTokenUsable(session.accessToken)) {
    return session;
  }

  return refreshAdminSession();
}

export async function logoutAdmin() {
  const session = getStoredAuthSession();

  try {
    if (session?.refreshToken) {
      const activeSession = await ensureAdminSession();

      await postJson<MessageResponse>(
        "/api/Auth/logout",
        { refreshToken: session.refreshToken },
        activeSession?.accessToken ?? session.accessToken,
      );
    }
  } finally {
    clearAuthSession();
  }
}

export async function adminFetch(input: string, init: RequestInit = {}) {
  const session = await ensureAdminSession();

  if (!session) {
    throw new ApiError("Please sign in to continue.", 401);
  }

  const requestUrl = input.startsWith("http") ? input : getApiUrl(input);
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${session.accessToken}`);

  const response = await fetch(requestUrl, {
    ...init,
    headers,
  });

  if (response.status !== 401) {
    return response;
  }

  const refreshedSession = await refreshAdminSession();

  if (!refreshedSession) {
    throw new ApiError("Your session expired. Please sign in again.", 401);
  }

  headers.set("Authorization", `Bearer ${refreshedSession.accessToken}`);

  return fetch(requestUrl, {
    ...init,
    headers,
  });
}

export { ApiError };
