import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { GameControlsContext } from '../contexts/GameControlsContext';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { postPattern } from '../api';


const GameControls = () => {
const [patternName, setPatternName] = useState('');
const [show, setShow] = useState(false);
const [showAlert, setShowAlert] = useState(false);
const [alertMsg, setAlertMsg] = useState('');

const [showSuccess, setShowSuccess] = useState(false);
const location = useLocation();

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const { controls, setControls } = useContext(GameControlsContext);

const username = useSelector(state => state.board.username);
const board = useSelector(state => {
  const config = state.board.configuration;
  if (config.length < 11) {
    return config;
  } else {
    const arr = [];
    for (let i = 0; i < 10; i ++) {
      const rowArr = [];
      for (let k = 0; k < 10; k ++) {
        rowArr.push(config[i][k]);
      };
      arr.push(rowArr);
    };
    return arr;
  }
})

const patternBody = board.map(m => m.join("")).join(" ");

const handleClick = e => {
  let click = 0;
  if (!e.target.id || e.target.id === 'physics') return;

  if (e.target.id === "faster" || e.target.id === "slower") {
    setControls({button: e.target.id, speedModifier: ++click});
  } else {
    setControls(prev => ({...prev, button: e.target.id}))
  }
};

const handleSubmit = e => {
  setShow(false);
  if (!username) {
    setAlertMsg("You must be logged in to save a pattern to your collection.");
    setShowAlert(true);
    return;
  };
  
  if (/^([^1])+$/.test(patternBody)){
    setAlertMsg("Pattern cannot be empty.");
    setShowAlert(true);
    return;
  };

  if (!patternName) {
    setAlertMsg("Please provide a name for your pattern.");
    setShowAlert(true);
    return;
  };
 
  postPattern(username, patternName, patternBody).then(() => {
    setShowSuccess(true);
  }).catch(err => {
    setAlertMsg(err.response.data.msg);
    setShowAlert(true);
  })
}

return (
<section className="game-controls">

{showAlert && <Alert className="alert" variant="danger" onClose={() => setShowAlert(false)} dismissible>
      <Alert.Heading>Something went wrong...</Alert.Heading>
      <p>{alertMsg}</p>
    </Alert>}

    <Alert show={showSuccess} variant="success">
        <Alert.Heading>You pattern has been added to your collection.</Alert.Heading>
        <p>
          Job done. Now let's get back to the game.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowSuccess(false)} variant="outline-success">
            Dismiss.
          </Button>
        </div>
      </Alert>

      {location.pathname[1] === "3" && <Dropdown onClick={handleClick}>
        <Dropdown.Toggle id="effects" variant="secondary">
          Effects
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">
          <Dropdown.Item id="stars">Stars</Dropdown.Item>
          <Dropdown.Item id="sky">Sky</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>}

<ButtonGroup className="button-module" onClick={handleClick} aria-label="Basic example">
  <Button id="start" variant="secondary">Start</Button>
  <Button id="stop" variant="secondary">Stop</Button>
  <Button id="reset" variant="secondary">Reset</Button>
  <Button id="faster" variant="secondary">🡱 faster</Button>
  <Button id="slower" variant="secondary">🡳 slower</Button>
  <Button id="incSize" variant="secondary">🡱 size</Button>
  <Button id="decSize" variant="secondary">🡳 size</Button>
  <Button id="randomise" variant="secondary">Randomise</Button>
</ButtonGroup>

<ButtonGroup className="button-module" onClick={handleClick} aria-label="Basic example">

  <Button id="clear" variant="secondary">Clear</Button>
  <Button id="hide" variant="secondary">Toggle 3D text</Button>
  
  <DropdownButton as={ButtonGroup} title="Edge type" className="bg-nested-dropdown">
   <Dropdown.Item id="edge" eventKey="1">Hard edge</Dropdown.Item>
   <Dropdown.Item id="wrap" eventKey="2">Wrap around</Dropdown.Item>
 </DropdownButton>

 <DropdownButton as={ButtonGroup} title="Click to interact" className="bg-nested-dropdown">
   <Dropdown.Item id="enableClick" eventKey="1">Enable</Dropdown.Item>
   <Dropdown.Item id="disableClick" eventKey="2">Disable</Dropdown.Item>
 </DropdownButton>
  <Button variant="primary" id="save" onClick={handleShow}>
        Save pattern
      </Button>
</ButtonGroup>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save pattern</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>What would you like to name this pattern?</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pattern name."
                autoFocus
                onChange={e => setPatternName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save pattern
          </Button>
        </Modal.Footer>
      </Modal>

</section>)
};

export default GameControls;