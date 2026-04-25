import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleTheme } from "@/store/slices/themeSlice";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Moon, Sun, Globe } from "lucide-react";
import i18n from "@/i18n";

export default function Settings() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.theme.mode);
  const [language, setLanguage] = useState(i18n.language);

  function handleLanguageChange(lang: string) {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t("nav.settings")}
      </h1>

      <Card>
        <h2 className="mb-4 font-semibold text-gray-900 dark:text-white">Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Theme</p>
            <p className="text-xs text-gray-500">
              Current: {theme === "dark" ? "Dark" : "Light"} mode
            </p>
          </div>
          <Button variant="secondary" onClick={() => dispatch(toggleTheme())}>
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            Toggle Theme
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 font-semibold text-gray-900 dark:text-white">
          <Globe className="inline h-4 w-4 mr-2" />
          Language
        </h2>
        <div className="flex gap-3">
          {["en", "hi"].map((lang) => (
            <Button
              key={lang}
              variant={language === lang ? "primary" : "secondary"}
              onClick={() => handleLanguageChange(lang)}
            >
              {lang === "en" ? "English" : "हिंदी"}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
