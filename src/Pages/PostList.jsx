import React from "react";
import { useState } from "react";
import Post from "./Post";
import { Outlet, useLoaderData } from "react-router-dom";

export default function PostList() {
  const posts = useLoaderData();
  console.log(posts)
  // const [posts, setPosts]  = useState([
  //     {
  //         id: 1,
  //         Image: "https://media.npr.org/assets/img/2021/08/23/about_love-a5c5a160b609b952ef65d037dc214fe3dc8b692f-s900-c85.webp",
  //         title: "Beauty Tips",
  //         summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum quos dicta, veniam ipsum, quaerat ratione nesciunt sapiente hic cumque accusamus quasi  "
  //     },
  //     {
  //         id: 2,
  //         Image: "https://media.npr.org/assets/img/2021/08/23/about_love-a5c5a160b609b952ef65d037dc214fe3dc8b692f-s900-c85.webp",
  //         title: "Beauty Tips",
  //         summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum quos dicta, veniam ipsum, quaerat ratione nesciunt sapiente hic cumque accusamus quasi  "
  //     }

  // ])

  return (
    <>
      <div
        style={{
          padding: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        //   flexDirection: "row",
          gap: "2rem",
          background: "linear-gradient(to right, #9370db 40%, #ff69b4 70%",
        //   height: "70%",
        }}
      >
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
      <Outlet />
    </>
  );
}

export async function postLoader() {
  const PostData = await fetch(`http://localhost:3020/post`);
  if (!PostData) throw Error("Data cannot be fetched pls");
  return PostData.json();
}


