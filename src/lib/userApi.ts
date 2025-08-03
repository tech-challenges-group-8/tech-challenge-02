import { apiClient } from "./apiClient";

export const userApi = {
  getUserSession: async () => {
    const response = await apiClient.get(`/account`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to get user session");
    }

    return data.result;
  },

  createUser: async (userData: { username: string; email: string; password: string }) => {
    const response = await apiClient.postPublic("/user", userData);
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create user");
    }

    return data;
  },
};
