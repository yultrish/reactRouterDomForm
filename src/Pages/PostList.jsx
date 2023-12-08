import React from "react";
import { useState } from "react";
import Post from "./Post";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import { Form } from "react-bootstrap";
import { Form } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function PostList() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  // const [author, setAuthor] = useState(post.author);
  // const [summary, setSummary] = useState(post.summary);

  const handleClose = () => {
    setShow(true);
  };
  const posts = useLoaderData();
  console.log(posts)

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
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Add a new post</Modal.Title>
        </Modal.Header>
        <Form method="PATCH" style={formStyle}>
          <Modal.Body>
            <label htmlFor="text">Author</label>
            <input type="text" name="author" style={inputStyle} />
            <label htmlFor="text">Summary</label>
            <textarea
              name="summary"
              id="summary"
              cols="20"
              rows="5"
              style={inputStyle}
              valueDefault
              // required
            ></textarea>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                style={{ transform: "translate(-280%)" }}
              >
                Close
              </Button>
              <button type="submit" style={buttonStyle}>
                Add
              </button>
            </Modal.Footer>
          </Modal.Body>
        </Form>
      </Modal> */}

      <Outlet />
    </>
  );
}

export async function postLoader() {
  const PostData = await fetch(`http://localhost:3020/post`);
  if (!PostData) throw Error("Data cannot be fetched pls");
  return PostData.json();
}


// export async function patchAction({ request, params }) {
//   // <Post/>
//   switch (request.method) {
//     case "PUT":{
//       let formData = await request.formData();
//       let author = formData.get("author");
//       return params.id
//     }
      
//       break;
  
//     default:
//       break;
//   }
//   // let formData = await request.formData();
//   // let author = formData.get("author");
//   // let summary = formData.get("summary");

//   // let confirmed = window.confirm("Are you sure you want to edit it?");
//   // if (confirmed) {
//   //   try {
//   //     const response = await fetch(`http://localhost:3020/post/${postID}`, {
//   //       method: "PATCH",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         author,
//   //         summary,
//   //       }),
//   //     });

//   //     if (response.ok) {
//   //       console.log("Post edited successfully");
//   //       return redirect("/")
//   //       // Optionally, you can perform any actions needed after a successful edit
//   //       // For example, update state or trigger a re-render
//   //     } else {
//   //       console.error("Failed to edit post");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error editing post:", error);
//   //   }
//   // }
// }


// const formStyle = {
//   width: "100%",
//   maxWidth: "400px",
//   margin: "0 auto",
// };

// const inputStyle = {
//   width: "100%",
//   marginBottom: "10px",
//   padding: "8px",
//   borderRadius: "4px",
//   border: "1px solid",
// };

// const buttonStyle = {
//   backgroundColor: "#007bff",
//   color: "#fff",
//   padding: "10px 20px",
//   cursor: "pointer",
//   borderRadius: "7px",
//   border: "none",
// };





