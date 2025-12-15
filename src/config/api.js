export const API_ROOT = "/api";
export const APP_TOKEN = import.meta.env.VITE_APP_TOKEN;

export const PUBLIC_HEADERS = {
  "x-app-token": APP_TOKEN,
  "Content-Type": "application/json",
};
