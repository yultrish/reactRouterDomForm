import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import { Nav } from './Component/Nav'
// import NewPost from './Component/Newpost'
import RootLayout from "./Pages/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewPost from "./Component/Newpost";
import PostList, { postLoader } from "./Pages/PostList";
import { actionData } from "./Component/Newpost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Edit from "./Component/Edit";
import Post from "./Pages/Post";
import { PatchAction } from "./Component/Edit";
// import { patchAction } from "./Pages/PostList";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        // path: "/create-post",
        // element: <NewPost/>
        path: "/",
        element: <PostList />,
        loader: postLoader,
        // action: patchAction,
        children: [
          {
            path: "/create-post",
            element: <NewPost />,
            action: actionData,
          },
          // {
          //   path: "/edit-post",
          //   element: <Edit />,
          //   action: PatchAction,
          // },
        ],
      },
      {
        //  path: "/create-post",
        // element: <NewPost/>
      },
    ],
  },
]);

function App() {
  <ToastContainer
    position="top-left" 
    autoClose={5000} 
  />;

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
