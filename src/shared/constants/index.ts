export const API_URL = import.meta.env.VITE_API_URL;

export const ENDPOINTS = {
  LOGIN: "/auth/sign-in",
  SIGNUP: "/auth/sign-up",
  REFRESH: "/auth/refresh",
  GET_SELF: "/users/me",
};

export interface AutocompleteOption {
  label: string;
  value: string;
}
