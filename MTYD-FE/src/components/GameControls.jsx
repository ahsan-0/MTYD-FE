import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { GameControlsContext } from '../contexts/GameControlsContext';

const GameControls = () => {

const { setControls } = useContext(GameControlsContext);

const handleClick = e => {
  let click = 0;
  if (!e.target.id) return;

  if (e.target.id === "faster" || e.target.id === "slower") {
    setControls({button: e.target.id, speedModifier: ++click});
  } else {
    setControls(prev => ({...prev, button: e.target.id}))
  }
};

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
 <Button id="clear" variant="secondary">Erase</Button>
</ButtonGroup>
</section>)
};

export default GameControls;