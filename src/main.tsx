import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@crayonai/react-ui";
import { Toaster } from "sonner";
import "@crayonai/react-ui/styles/index.css";
import App from "./App";
import "./style.css";
import "./components.css";
import { initializeTheme } from "./themes/themeManager";

function Root() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  React.useEffect(() => {
    // Initialize theme on app load
    initializeTheme();
  }, []);

  return (
    <ThemeProvider mode={theme}>
      <App theme={theme} setTheme={setTheme} />
      <Toaster />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
