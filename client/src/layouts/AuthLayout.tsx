import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "@/store";

export default function AuthLayout() {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-brand-600 dark:text-brand-400">
            FinVerse AI
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Enterprise AI-Powered Financial Platform
          </p>
        </div>
        <div className="card">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
