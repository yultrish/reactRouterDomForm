import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useActionData, redirect } from "react-router-dom";
import { Form } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

export default function Newpost() {
  let navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleClose = () => navigate(-1);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Add a new post</Modal.Title>
        </Modal.Header>
        <Form method="post" style={formStyle} action="/create-post">
          <Modal.Body>
            <label htmlFor="text">Author</label>
            <input type="text" name="author" style={inputStyle} required />
            <label htmlFor="text">Summary</label>
            <textarea
              name="summary"
              id="summary"
              cols="20"
              rows="5"
              style={inputStyle}
              required
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

export async function actionData({ request }) {
  let formData = await request.formData();
  let inputAuthor = formData.get("author");
  let inputSummary = formData.get("summary");

  try {
    const existingPostData = await fetch(
      `http://localhost:3020/post?author=${inputAuthor}&summary=${inputSummary}`
    );
    const existingPost = await existingPostData.json();

    if (existingPost.length > 0) {
      toast.error("Post already exists");
      return { error: "Post already exists" };
    }
    let response = await fetch(`http://localhost:3020/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author: inputAuthor, summary: inputSummary }),
    });

    if (response.ok) {
      const newItem = await response.json();
      toast.success("Post added successfully");
      return redirect("/");
    } else {
      toast.error("Failed to add Post");
    }
  } catch (error) {
    toast.error(error.message);
    return null;
  }
}

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
