export const API_URL = import.meta.env.VITE_API_URL;
export const API_WS_URL = import.meta.env.VITE_API_WS_URL;
export const MINIO_URL = import.meta.env.VITE_MINIO_URL;

export const ENDPOINTS = {
  LOGIN: "/auth/sign-in",
  SIGNUP: "/auth/sign-up",
  REFRESH: "/auth/refresh",
  GET_SELF: "/users/me",
  UPLOAD_FILE: "/augmentation/upload"
};

export interface AutocompleteOption {
  label: string;
  value: string;
}
