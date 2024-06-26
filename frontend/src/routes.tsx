import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/app/Dashboard/Dashboard";
import { SignIn } from "./pages/auth/signIn";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignUp } from "./pages/auth/signUp";
import { Orders } from "./pages/app/orders/orders";
import { NotFound } from './pages/Error404'
import { Error } from './pages/error'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  // qualquer endereço que nao der match com um dos endereços acima, vai ir para esta página
  {
    path: '*',
    element: <NotFound />
  }
]);
