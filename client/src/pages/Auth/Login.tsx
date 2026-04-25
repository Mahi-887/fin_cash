import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLoginMutation } from "@/store/api/authApi";
import { setCredentials } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function Login() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const result = await login(form).unwrap();
      dispatch(setCredentials({ user: result.user, accessToken: result.accessToken }));
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {t("auth.login")}
      </h2>

      {error && (
        <p className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <Input
        label={t("auth.email")}
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        autoComplete="email"
      />
      <Input
        label={t("auth.password")}
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
        autoComplete="current-password"
      />

      <Button type="submit" className="w-full" isLoading={isLoading}>
        {t("auth.login")}
      </Button>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        {t("auth.noAccount")}{" "}
        <Link
          to="/auth/register"
          className="font-medium text-brand-600 dark:text-brand-400 hover:underline"
        >
          {t("auth.register")}
        </Link>
      </p>
    </form>
  );
}
