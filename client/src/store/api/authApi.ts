import { baseApi } from "./baseApi";
import type { LoginRequest, RegisterRequest, AuthResponse } from "@/types/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    register: build.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    refreshToken: build.mutation<{ accessToken: string }, { refreshToken: string }>({
      query: (body) => ({ url: "/auth/refresh", method: "POST", body }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["Auth"],
    }),
    getMe: build.query<AuthResponse["user"], void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApi;
