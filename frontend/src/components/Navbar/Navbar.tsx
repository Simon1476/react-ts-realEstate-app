import { useState } from "react";
import "./navbar.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEnvelope,
  faHouse,
  faInfoCircle,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const user = true;
  return (
    <nav>
      <div className="links">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>SimonEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="sign">
        {user ? (
          <div className="user">
            <img
              src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
              alt=""
            />
            <span>Simon</span>
            <Link to="/profile" className="profile">
              <div className="notification">5</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/">Sign in</a>
            <a href="/" className="register">
              Sign up
            </a>
          </>
        )}

        <div className="menuIcon">
          <img src="/menu.png" alt="" onClick={() => setOpen(!open)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <div className="link">
            <FontAwesomeIcon icon={faHouse} />
            <a href="/">Home</a>
          </div>
          <div className="link">
            <FontAwesomeIcon icon={faInfoCircle} />
            <a href="/">About</a>
          </div>
          <div className="link">
            <FontAwesomeIcon icon={faEnvelope} />
            <a href="/">Contact</a>
          </div>
          <div className="link">
            <FontAwesomeIcon icon={faUser} />
            <a href="/">Agents</a>
          </div>
          <div className="link">
            <FontAwesomeIcon icon={faLock} />
            <a href="/">Sign in</a>
          </div>
          <div className="link">
            <FontAwesomeIcon icon={faCheck} />
            <a href="/">Sign up</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
