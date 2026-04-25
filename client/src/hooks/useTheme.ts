import { useAppDispatch, useAppSelector } from "@/store";
import { toggleTheme, setTheme } from "@/store/slices/themeSlice";

export function useTheme() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);
  return {
    mode,
    isDark: mode === "dark",
    toggle: () => dispatch(toggleTheme()),
    set: (m: "light" | "dark") => dispatch(setTheme(m)),
  };
}
