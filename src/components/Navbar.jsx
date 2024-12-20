import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">. About</Link>
      <Link to="/works">. Works</Link>
      <Link to="/contact">. Contact</Link>
    </nav>
  );
};

export default Navbar;
