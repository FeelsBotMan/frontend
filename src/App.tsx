import Home from "./pages/Home";
import Layout from "./components/layout/layout";
import { BookStoreThemeProvider } from "./context/themeContext";
import { createBrowserRouter, RouterProvider } from "react-router";
import Error from "./components/common/Error";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/queryClient";
import ToastContainer from "./components/common/toast/ToastContainer";
import { ROUTES } from "./constants/routes";

const routeList = [
  {
    path: ROUTES.MAIN,
    element: <Home />,
  },
  {
    path: ROUTES.BOOKS,
    element: <Books />,
  },
  {
    path: ROUTES.BOOK_DETAIL,
    element: <BookDetail />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.CART,
    element: <Cart />,
  },
  {
    path: ROUTES.ORDER,
    element: <Order />,
  },
  {
    path: ROUTES.ORDER_LIST,
    element: <OrderList />,
  },
];

const newRouteList = routeList.map((item) => {
  return {
    ...item,
    element: <Layout>{item.element}</Layout>,
    errorElement: <Error />,
  };
});

const router = createBrowserRouter(newRouteList);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookStoreThemeProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </BookStoreThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
