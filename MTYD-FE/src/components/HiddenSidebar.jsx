import Offcanvas from "react-bootstrap/Offcanvas";

function HiddenSidebar({ showSidebar, setShowSidebar }) {
  const handleClose = () => setShowSidebar(false);

  return (
    <>
      <Offcanvas show={showSidebar} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tips and tricks</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Multiply...or die. Is it a game or is it reality? Are you an automaton or the game master?
          <h5>Example Patterns </h5>
          <img className="gametipsImg" src="/pattern1.png" alt="pattern example 1" />
          <img className="gametipsImg" src="/pattern2.png" alt="pattern example 2" />
          <img className="gametipsImg" src="/pattern3.png" alt="pattern example 3" />
          <img className="gametipsImg" src="/pattern4.png" alt="pattern example 4" />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default HiddenSidebar;