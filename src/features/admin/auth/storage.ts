import type { AuthSession } from "./types";

const AUTH_STORAGE_KEY = "tourism_admin_auth";
const TOKEN_EXPIRY_BUFFER_MS = 30_000;

type JwtPayload = {
  exp?: number;
  [key: string]: unknown;
};

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function parseJwtPayload(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split(".");

    if (!payload) {
      return null;
    }

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );

    return JSON.parse(window.atob(padded)) as JwtPayload;
  } catch {
    return null;
  }
}

export function getStoredAuthSession(): AuthSession | null {
  if (!canUseStorage()) {
    return null;
  }

  try {
    const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawSession) {
      return null;
    }

    const session = JSON.parse(rawSession) as Partial<AuthSession>;

    if (!session.accessToken || !session.refreshToken || !session.role) {
      return null;
    }

    return {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      role: session.role,
    };
  } catch {
    return null;
  }
}

export function getUserFromSession(session: AuthSession | null) {
  if (!session?.accessToken) return { name: undefined, email: undefined };

  const payload = parseJwtPayload(session.accessToken);

  if (!payload || typeof payload !== "object") {
    return { name: undefined, email: undefined };
  }

  const name = (payload as any).name || (payload as any).given_name || undefined;
  const email = (payload as any).email || undefined;

  return { name, email };
}

export function storeAuthSession(session: AuthSession) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("admin-auth-changed"));
}

export function clearAuthSession() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event("admin-auth-changed"));
}

export function isTokenUsable(token: string) {
  const payload = parseJwtPayload(token);

  if (!payload?.exp) {
    return Boolean(token);
  }

  return payload.exp * 1000 - TOKEN_EXPIRY_BUFFER_MS > Date.now();
}
