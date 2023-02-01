import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { GameControlsContext } from '../contexts/GameControlsContext';
import { useDispatch, useSelector } from "react-redux";

import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { postPattern } from '../api';

const GameControls = () => {
const [patternName, setPatternName] = useState('');
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const { controls, setControls } = useContext(GameControlsContext);

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
  postPattern()
}

return (
<section className="game-controls">
<ButtonGroup onClick={handleClick} aria-label="Basic example">
  <Button id="start" variant="secondary">Start</Button>
  <Button id="stop" variant="secondary">Stop</Button>
  <Button id="reset" variant="secondary">Reset</Button>
  <Button id="faster" variant="secondary">🡱 faster</Button>
  <Button id="slower" variant="secondary">🡳 slower</Button>
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
          <Button variant="secondary" onClick={handleClose}>
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