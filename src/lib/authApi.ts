import { apiClient } from "./apiClient";

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await apiClient.postPublic("/user/auth", { email, password });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  },
};
