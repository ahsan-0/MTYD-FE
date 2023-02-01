import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav>
      <Link to="/patterns">Patterns Library</Link>
      <Link to="/automatrix">Play Game</Link>
      <Link to="/how-to-play">Tutorial & Rules</Link>
      <Link to="/account">Account</Link>
      <Link to="/updateprofile">Update profile</Link>
    </nav>
  );
}

export default Nav;
