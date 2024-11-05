// src/index.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./view/Home";

import AppLayout from "../src/layout/Layout.jsx";
import CategoryLayout from "../src/layout/CategoryLayout.jsx";
import BackOfficeLayout from "./layout/AdminLayout.jsx";
import Checkout from "./view/Checkout.jsx";

import BackOfficeHome from "./view/BackOffice/BackOfficeHome.jsx";
import AddProduct from "./view/BackOffice/Addproduct.jsx";
import EditProduct from "./view/BackOffice/EditProduct.jsx";
import HistoryProduct from "./view/BackOffice/HistoryProduct.jsx";
import Addcategory from "./view/BackOffice/addCategory.jsx";
import Category from "./view//Category.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "backoffice",
        element: <BackOfficeLayout />,
        children: [
          {
            path: "/backoffice",
            element: <BackOfficeHome />,
          },
          {
            path: "/backoffice/addproduct",
            element: <AddProduct />,
          },
          {
            path: "/backoffice/category",
            element: <Addcategory />,
          },
          {
            path: "/backoffice/editproduct",
            element: <EditProduct />,
          },
          {
            path: "/backoffice/history",
            element: <HistoryProduct />,
          },
        ],
      },
      {
        path: "category",
        element: <CategoryLayout />,
        children: [
          {
            path: "/category",
            element: <Category />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
