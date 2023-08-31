import axios from "axios";
import React, { useState } from "react";
import { Container, Nav, Navbar, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ADD, API } from "../constants";

function PostPageAdd() {

const [ caption, setCaption ] = useState("");    
const [ image, setImage ] = useState("");
const navigate = useNavigate();

async function onSubmit() {
  const post = { image, caption };
  try {
    await axios.post(API + ADD, post);
    navigate("/");
   } catch (error) {
    console.log(error.message);
   }

}

return (
    <>
    <Navbar variant="light" bg="light">
     <Container>
       <Navbar.Brand href="/">The Giving Circle</Navbar.Brand>
       <Nav>
         <Nav.Link href="/add">New Post</Nav.Link>
          </Nav>
        </Container>
     </Navbar>
     <Container>
        <h1 style={{ marginBlock: "1rem"}}>Add Post</h1>
        <form>


            <Form.Group className="mb-3" controlID="caption">
                <Form.Label>Caption</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Lovely Day Today!" 
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlID="image">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" 
                placeholder="https://zca.sg/img/1" 
                value={image}
                onChange={(event) => setImage(event.target.value)}
                />
            </Form.Group>

            <Button onClick={onSubmit} variant="primary">Submit</Button>
        </form>
    </Container>
    </>

  );
}

export default PostPageAdd;
