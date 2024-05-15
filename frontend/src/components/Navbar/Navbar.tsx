import { useContext, useState } from "react";
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
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  const isUser =
    Object.keys(currentUser).length !== 0 && currentUser.username !== "";
  if (isUser) {
    fetch();
  }
  return (
    <nav>
      <div className="links">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>SimonEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/list">List</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="sign">
        {isUser ? (
          <div className="user">
            <img src={currentUser.avatar || "noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
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
