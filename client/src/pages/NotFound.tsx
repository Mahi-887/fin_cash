import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-8xl font-bold text-brand-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
        Page not found
      </h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/dashboard" className="btn-primary mt-6">
        Go to Dashboard
      </Link>
    </div>
  );
}
