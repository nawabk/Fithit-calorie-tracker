import React from 'react';
import {Navbar,Nav,Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {NavBar,Collapse} from 'reactstrap';
const navigation = (props) =>(
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/calories">Calories</NavLink>
      <Nav.Link href="#pricing">Supplements</Nav.Link>
      <Nav.Link href="#pricing">Nutrition</Nav.Link>
      <Nav.Link href="#pricing">Training</Nav.Link>
    </Nav>
    {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form> */}
  </Navbar>
//   <br />
//   <Navbar bg="primary" variant="dark">
//     <Navbar.Brand href="#home">Navbar</Navbar.Brand>
//     <Nav className="mr-auto">
//       <Nav.Link href="#home">Home</Nav.Link>
//       <Nav.Link href="#features">Features</Nav.Link>
//       <Nav.Link href="#pricing">Pricing</Nav.Link>
//     </Nav>
//     <Form inline>
//       <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//       <Button variant="outline-light">Search</Button>
//     </Form>
//   </Navbar>

//   <br />
//   <Navbar bg="light" variant="light">
//     <Navbar.Brand href="#home">Navbar</Navbar.Brand>
//     <Nav className="mr-auto">
//       <Nav.Link href="#home">Home</Nav.Link>
//       <Nav.Link href="#features">Features</Nav.Link>
//       <Nav.Link href="#pricing">Pricing</Nav.Link>
//     </Nav>
//     <Form inline>
//       <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//       <Button variant="outline-primary">Search</Button>
//     </Form>
//   </Navbar>
)

export default navigation;