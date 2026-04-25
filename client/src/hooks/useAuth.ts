import { useAppSelector, useAppDispatch } from "@/store";
import { logout, setCredentials } from "@/store/slices/authSlice";
import { useLogoutMutation } from "@/store/api/authApi";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((s) => s.auth);
  const [logoutMutation] = useLogoutMutation();

  async function handleLogout() {
    try {
      await logoutMutation().unwrap();
    } finally {
      dispatch(logout());
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    logout: handleLogout,
    setCredentials: (payload: Parameters<typeof setCredentials>[0]) =>
      dispatch(setCredentials(payload)),
  };
}
