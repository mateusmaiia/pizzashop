import "./global.css";
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes";
import { Toaster } from 'sonner'
export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">
      <HelmetProvider>
        <Toaster richColors/>
        <Helmet titleTemplate="%s | pizza.shop" />
        <RouterProvider router={router} />
      </HelmetProvider>
    </ThemeProvider>
  );
}
