import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useState } from "react";
import HiddenSidebar from './HiddenSidebar';
import { getPatterns } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { displayPattern } from "../features/board/boardSlice";

function Navigation() {
const [showSidebar, setShowSidebar] = useState(false);
const [patterns, setPatterns] = useState([]);
const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(() => {
  getPatterns().then(({data : {patterns}}) => {
    setPatterns(patterns);
  })
}, []);

function handleClick(args) {
  return () => {
    dispatch(displayPattern(args));
    navigate("3dgame");
  };
};

  return (
    <>
    <Navbar id="nav" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>Automatrix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Patterns" id="collasible-nav-dropdown">
              {patterns.length && patterns.map(pattern => {
                return <NavDropdown.Item key={pattern._id} onClick={handleClick(pattern.pattern_body)}>"{pattern.pattern_name}"</NavDropdown.Item>
              })}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate("")}>
                Home
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => navigate("tutorial")}>How to play</Nav.Link>
            <Nav.Link onClick={() => navigate("3dgame")}>3D game</Nav.Link>
            <Nav.Link onClick={() => navigate("2dgame")}>2D game</Nav.Link>
            <Nav.Link onClick={() => navigate("patterns")}>All patterns</Nav.Link>
            <Nav.Link onClick={() => navigate("user")}>My patterns</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => setShowSidebar(true)}>Game tips</Nav.Link>
            <Nav.Link onClick={() => navigate("login")}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <HiddenSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
    </>
  );
}

export default Navigation;


/*
  <NavDropdown.Item href="#action/3.1">Pattern #1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Pattern #2
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Pattern #3</NavDropdown.Item>

*/