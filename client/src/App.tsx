import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { useAppSelector } from "@/store";

export default function App() {
  const theme = useAppSelector((s) => s.theme.mode);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <RouterProvider router={router} />
    </div>
  );
}
