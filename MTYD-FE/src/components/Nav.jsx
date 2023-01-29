import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/patterns">Patterns Library</Link>
      <Link to="/automatrix">Play Game</Link>
      <Link to="/how-to-play">Tutorial & Rules</Link>
    </nav>
  );
}

export default Nav;
