import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import { Form } from "react-bootstrap";
import { Form } from "react-router-dom";
import { redirect, useNavigate } from "react-router-dom";

export default function Post({ post }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [author, setAuthor] = useState(post.author);
  const [summary, setSummary] = useState(post.summary);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    // navigate("/edit-list")
    console.log(post.id)
    setShow(true)
  };

  const deletePost = async (postID) => {
    let confirmed = window.confirm("Are you sure you want to delete it?");
    if (confirmed) {
      try {
        await fetch(`http://localhost:3020/post/${postID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        navigate("/");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  // const editPost = async (postID) => {
  //   console.log(postID)
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
  //         handleClose();
  //         // Optionally, you can perform any actions needed after a successful edit
  //         // For example, update state or trigger a re-render
  //       } else {
  //         console.error("Failed to edit post");
  //       }
  //     } catch (error) {
  //       console.error("Error editing post:", error);
  //     }
  //   }
  // };

  return (
    <>
      <div
        style={{
          border: "1px solid aliceBlue",
          width: "100%",
          height: "250px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          backgroundColor: "aliceblue",
        }}
        className="card"
      >
        <RiDeleteBin5Line size={30} onClick={() => deletePost(post.id)} />
        <HiOutlinePencilAlt onClick={handleShow} />

        <blockquote
          style={{
            fontWeight: "bolder",
            fontSize: "2rem",
            marginLeft: "20%",
            marginTop: "0.6rem",
          }}
        >
          {post.author}
        </blockquote>
        <p
          style={{
            padding: "0",
            fontFamily: "serif",
            width: "80%",
            marginLeft: "5%",
            textAlign: "center",
          }}
        >
          {post.summary}
        </p>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSummary">
              <Form.Label>Summary</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => editPost(post.id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>







    </>
  );
}


