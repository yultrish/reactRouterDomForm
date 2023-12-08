import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [author, setAuthor] = useState(post.author);
  const [summary, setSummary] = useState(post.summary);
  const [isDeleting, setDeleting] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const deletePost = async (postID) => {
    setDeleting(true);
    try {
      await fetch(`http://localhost:3020/post/${postID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Error deleting post:", error);
      setDeleting(false); 
    }
  };

  const editPost = async (postID) => {
    // let confirmed = confirm(`Are you sure you want to edit post with ${postID}`);
    // if (confirmed) {
      try {
      
        const response = await fetch(`http://localhost:3020/post/${postID}`, {
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
          // console.log("Post edited successfully");
          toast.success("item updated successfully")
          handleClose();
        } else {
          console.error("Failed to edit post");
        }
      } catch (error) {
        console.error("Error editing post:", error);
      }
    // }
  };

  
  const cardStyle = {
    border: "1px solid aliceBlue",
    width: "100%",
    height: "250px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    backgroundColor: "aliceblue",
    opacity: isDeleting ? 0 : 1, 
    transition: "opacity 0.5s ease-out", 
  };

  return (
    <>
      <div
       style={cardStyle}
      
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
          {author}
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
          {summary}
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
};

export default Post;
