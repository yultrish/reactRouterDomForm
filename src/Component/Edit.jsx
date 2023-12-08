import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useActionData, redirect } from "react-router-dom";
import { Form } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Post from "../Pages/Post";

// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

export default function Edit() {
  let navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleClose = () => navigate(-1);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Add a new post</Modal.Title>
        </Modal.Header>
        <Form method="PATCH" style={formStyle} action="/edit-post">
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
      </Modal>
      
    </>
  );
}

// PatchAction.jsx
export async function PatchAction({ postId }) {
  if (!postId) {
    console.error("Post ID is undefined");
    return null;
  }

  try {
    // Fetch the post data using postId
    const postResponse = await fetch(`http://localhost:3020/post/${postId}`);
    const postData = await postResponse.json();

    if (!postResponse.ok || !postData) {
      console.error("Failed to fetch post data");
      return null;
    }

    const post = postData; // Adjust the structure if needed

    // Extract author and summary from the post data
    const { author, summary } = post;

    // Your existing logic for editing the post
    let confirmed = window.confirm("Are you sure you want to edit it?");
    if (confirmed) {
      const response = await fetch(`http://localhost:3020/post/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author,
          summary,
        }),
      });

      if (response.ok) {
        console.log("Post edited successfully");
        // Optionally, you can perform any actions needed after a successful edit
        // For example, update state or trigger a re-render
      } else {
        console.error("Failed to edit post");
      }
    }
  } catch (error) {
    console.error("Error editing post:", error);
  }

  return null;
}



// patchAction({ post });


const formStyle = {
  width: "100%",
  maxWidth: "400px",
  margin: "0 auto",
};

const inputStyle = {
  width: "100%",
  marginBottom: "10px",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px 20px",
  cursor: "pointer",
  borderRadius: "7px",
  border: "none",
};
