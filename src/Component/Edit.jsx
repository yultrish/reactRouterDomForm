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

// export async function patchAction({ request, postID }) {
//   <Post/>
//   let formData = await request.formData();
//   let author = formData.get("author");
//   let summary = formData.get("summary");

//   let confirmed = window.confirm("Are you sure you want to edit it?");
//   if (confirmed) {
//     try {
//       const response = await fetch(`http://localhost:3020/post/${postID}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           author,
//           summary,
//         }),
//       });

//       if (response.ok) {
//         console.log("Post edited successfully");
//         return redirect("/")
//         // Optionally, you can perform any actions needed after a successful edit
//         // For example, update state or trigger a re-render
//       } else {
//         console.error("Failed to edit post");
//       }
//     } catch (error) {
//       console.error("Error editing post:", error);
//     }
//   }
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
