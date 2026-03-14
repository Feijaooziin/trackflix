import { useEffect } from "react";
import Navigation from "@/navigation";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { initDatabase } from "@/database/initDatabase";

export default function App() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}
