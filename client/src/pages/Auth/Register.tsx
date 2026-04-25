import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRegisterMutation } from "@/store/api/authApi";
import { setCredentials } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function Register() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const result = await register(form).unwrap();
      dispatch(setCredentials({ user: result.user, accessToken: result.accessToken }));
      navigate("/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {t("auth.register")}
      </h2>

      {error && (
        <p className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <Input
        label="Full Name"
        type="text"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        autoComplete="name"
      />
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
        autoComplete="new-password"
        minLength={8}
      />

      <Button type="submit" className="w-full" isLoading={isLoading}>
        {t("auth.register")}
      </Button>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        {t("auth.hasAccount")}{" "}
        <Link
          to="/auth/login"
          className="font-medium text-brand-600 dark:text-brand-400 hover:underline"
        >
          {t("auth.login")}
        </Link>
      </p>
    </form>
  );
}
