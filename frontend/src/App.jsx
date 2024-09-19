import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import TableWithFilters from "./component/check";
import Category from "./component/Category";
import Subcategory from "./component/Subcategory";
import Products from "./component/Products";
import Layout from "./component/Layout";
import AddCat from "./component/AddCat";
import EditCat from "./component/EditCat";
import AddSubcategory from "./component/AddSubcategory";
import EditSubCat from "./component/EditSubCat";
import AddProduct from "./component/AddProduct";
import ViewProudctDetails from "./component/ViewProductDetails";
import EditProduct from "./component/EditProduct";
// import tabldDataStore from "./store/dataStore";
// import { Provider } from "react-redux";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/subcategory", element: <Subcategory /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/category", element: <Category /> },
      { path: "/category/addcat", element: <AddCat /> },
      { path: "/editcat", element: <EditCat /> },
      { path: "/addsubcategory", element: <AddSubcategory /> },
      { path: "/editsubcat", element: <EditSubCat /> },
      { path: "/products", element: <Products /> },
      { path: "/addproduct", element: <AddProduct /> },
      { path: "/viewproductdetails", element: <ViewProudctDetails /> },
      { path: "/editproduct", element: <EditProduct /> },
    ],
  },

  // { path: "/table", element: <TableWithFilters /> },
  // { path: "/dashboard", element: <Dashboard /> },
  // { path: "/category", element: <Category /> },
  // { path: "/subcategory", element: <Subcategory /> },
  // { path: "/products", element: <Products /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
