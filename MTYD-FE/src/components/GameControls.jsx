import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { GameControlsContext } from '../contexts/GameControlsContext';

const GameControls = () => {

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

const condition = controls.button === "enablePhysics";

return (
<section className="game-controls">
<ButtonGroup onClick={handleClick} aria-label="Basic example">
  <Button disabled={condition} id="start" variant="secondary">Start</Button>
  <Button disabled={condition} id="stop" variant="secondary">Stop</Button>
  <Button disabled={condition} id="reset" variant="secondary">Reset</Button>
  <Button disabled={condition} id="faster" variant="secondary">🡱 faster</Button>
  <Button disabled={condition} id="slower" variant="secondary">🡳 slower</Button>
  <DropdownButton disabled={condition} as={ButtonGroup} title="Edge type" className="bg-nested-dropdown">
   <Dropdown.Item id="edge" eventKey="1">Hard edge</Dropdown.Item>
   <Dropdown.Item id="wrap" eventKey="2">Wrap around</Dropdown.Item>
 </DropdownButton>
 <DropdownButton disabled={condition} as={ButtonGroup} title="Click to interact" className="bg-nested-dropdown">
   <Dropdown.Item id="enableClick" eventKey="1">Enable</Dropdown.Item>
   <Dropdown.Item id="disableClick" eventKey="2">Disable</Dropdown.Item>
 </DropdownButton>
 <DropdownButton as={ButtonGroup} id="physics" title="Physics" className="bg-nested-dropdown">
   <Dropdown.Item id="enablePhysics" eventKey="1">Enable</Dropdown.Item>
   <Dropdown.Item id="disablePhysics" eventKey="2">Disable</Dropdown.Item>
 </DropdownButton>
</ButtonGroup>
</section>)
};

export default GameControls;