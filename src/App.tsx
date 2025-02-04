import Home from "./pages/Home";
import Layout from "./components/layout/layout";
import { BookStoreThemeProvider } from "./context/themeContext";
import { createBrowserRouter, RouterProvider } from "react-router";
import Error from "./components/common/Error";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
  },
  {
    path: "/books",
    element: (
      <Layout>
        <div>도서 목록</div>
      </Layout>
    ),
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <Signup />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <BookStoreThemeProvider>
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
}

export default App;
