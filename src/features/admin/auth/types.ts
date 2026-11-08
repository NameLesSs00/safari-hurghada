export type AdminRole = "Admin" | "SuperAdmin" | string;

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  role: AdminRole;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: AuthSession;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

export type RefreshRequest = {
  refreshToken: string;
};

export type RefreshResponse = {
  success: boolean;
  message: string;
  data: {
    accesstoken?: string;
    accessToken?: string;
  };
};

export type MessageResponse = {
  message: string;
};

export type ApiProblemDetails = {
  Message?: string;
  message?: string;
  title?: string;
  detail?: string;
  status?: number;
};
