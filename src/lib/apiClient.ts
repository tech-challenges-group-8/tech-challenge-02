const BASE_URL = import.meta.env.VITE_API_URL || "";

export const apiClient = {
  get: async (endpoint: string, options: RequestInit = {}) => {
    return fetch(`${BASE_URL}${endpoint}`, {
      cache: "no-store",
      ...options,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        ...(options.headers as Record<string, string>),
        ...getAuthHeaders(),
      },
    });
  },

  post: async (endpoint: string, data?: any, options: RequestInit = {}) => {
    return fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
        ...getAuthHeaders(),
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },

  patch: async (endpoint: string, data?: any, options: RequestInit = {}) => {
    return fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
        ...getAuthHeaders(),
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },

  delete: async (endpoint: string, options: RequestInit = {}) => {
    return fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      ...options,
      headers: {
        ...(options.headers as Record<string, string>),
        ...getAuthHeaders(),
      },
    });
  },

  // For unauthenticated requests
  postPublic: async (
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ) => {
    return fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },
};

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
