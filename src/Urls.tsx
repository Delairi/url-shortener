export const BASE_URL = import.meta.env.MODE === 'development' ? import.meta.env.VITE_BASE_URL_DEV : import.meta.env.VITE_BASE_URL;
export const SELF_URL = import.meta.env.MODE === 'development' ? import.meta.env.VITE_SELF_URL_DEV : import.meta.env.VITE_BASE_URL;
