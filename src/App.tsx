import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Login, Manufacturers } from "./pages";
import { useSelector } from "react-redux";

function App() {
  const {
    userAuth: { isLoggedIn },
    language: { language },
  }: any = useSelector((state) => state);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: !isLoggedIn ? (
        <Login language={language} />
      ) : (
        <Navigate to="/" replace />
      ),
    },
    {
      path: "/",
      element: isLoggedIn ? (
        <Manufacturers language={language} />
      ) : (
        <Navigate to="/login" replace />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
