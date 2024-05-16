import "./global.css";
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query"

import { router } from "./routes";
import { Toaster } from 'sonner'
import { queryClient } from './lib/react-query'
export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">
      <HelmetProvider>
        <Toaster richColors/>
        <Helmet titleTemplate="%s | pizza.shop" />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}
