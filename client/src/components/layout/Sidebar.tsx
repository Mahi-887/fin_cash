import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Briefcase,
  Bot,
  ArrowLeftRight,
  Settings,
  TrendingUp,
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, key: "nav.dashboard" },
  { to: "/portfolio", icon: Briefcase, key: "nav.portfolio" },
  { to: "/advisor", icon: Bot, key: "nav.advisor" },
  { to: "/transactions", icon: ArrowLeftRight, key: "nav.transactions" },
  { to: "/settings", icon: Settings, key: "nav.settings" },
];

export default function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-gray-100 dark:border-gray-800">
        <TrendingUp className="h-6 w-6 text-brand-600" />
        <span className="text-lg font-bold text-gray-900 dark:text-white">FinVerse AI</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map(({ to, icon: Icon, key }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              )
            }
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            {t(key)}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
