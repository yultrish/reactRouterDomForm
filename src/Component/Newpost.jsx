import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate,  useActionData,
   } from 'react-router-dom';
   import { Form } from "react-router-dom";
   import { toast, ToastContainer } from 'react-toastify';
   import 'react-toastify/dist/ReactToastify.css';
  

// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

export default function Newpost() {
  let postAction = useActionData()
 let navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleClose = () => navigate(-1);
  // const handleAdd = async () => {
  //   const result = await actionData();
  //   if (result !== null) {
  //     handleClose();
  //   }
  // };
  // const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Add a new post</Modal.Title>
        </Modal.Header>   
        <Modal.Body>
          <Form method="post" style={formStyle}>
              <input type="text" name="author" style={inputStyle}/>
              <textarea name="summary" id="summary" cols="20" rows="5" style={inputStyle}></textarea>
              <button type="submit" style={buttonStyle} >Create</button>
          </Form>
        </Modal.Body>
       
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} type='submit'>
            Add
          </Button>
          {/* <button type="submit" style={buttonStyle} onClick={() => { handleAdd() , handleClose()}}>
            Add
          </button> */}
        </Modal.Footer>
      </Modal>
      
    </>
  );
}

export async function actionData ({request}){
  // let navigate = useNavigate();
  // const handleClose = () => navigate(-1);
    let formData = await request.formData();
    let inputAuthor = formData.get("author")
    let inputSummary = formData.get("summary")

    if (!inputAuthor || !inputSummary) {
      toast.error('All inputs must be entered');
      return null;
    }


    let response = await fetch(`http://localhost:3020/post`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({author: inputAuthor, summary: inputSummary})
    })

    if (response.ok){
      const newItem = await response.json()
      return newItem
    }else{
      throw new Error("add failed")
      toast.error('An error occurred');
      return
    }

  }

// function handleSubmit (e){
//   e.preventDefault()
//   const dataInputs={
//     // author,
//     summary
//   }

  // console.log(dataInputs)
// }



// export default NewPost;

const formStyle = {
  // Your form styles here
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
};

const inputStyle = {
  // Your input styles here
  width: '100%',
  marginBottom: '10px',
  padding: '8px',
  borderRadius: "4px",
  border: "1px solid"
};

const buttonStyle = {
  // Your button styles here
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 20px',
  cursor: 'pointer',
  borderRadius: "7px",
  border: "none"
};