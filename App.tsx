import Navigation from "@/navigation";
import { ThemeProvider } from "@/theme/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}
