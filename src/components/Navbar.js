import React, { useState, useEffect } from "react";
import { Link, navigate } from "gatsby";
import logo from "../img/fenixlogo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { auth } from '../../firebase'; // Ensure this path is correct
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const toggleHamburger = () => {
    setActive(!active);
  };

  const handleProfileClick = () => {
    if (user) {
      navigate('/myprofile');
    } else {
      navigate('/login'); // Change to your login path
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
      <nav
          className="navbar is-transparent is-desktop"
          role="navigation"
          aria-label="main-navigation"
      >
        <div className="container">
          <div className="column">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item" title="Logo">
                <img src={logo} alt="Saturnian" />
              </Link>
              {/* Hamburger menu */}
              <div
                  className={`navbar-burger burger ${active ? "is-active" : ""}`}
                  data-target="navMenu"
                  role="menuitem"
                  tabIndex={0}
                  onKeyPress={toggleHamburger}
                  onClick={toggleHamburger}
              >
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
          <div id="navMenu" className={`navbar-menu ${active ? "is-active" : ""}`}>
            <div className="column">
              <div className="navbar-start has-text-centered">
                {/* Place your navbar items here */}
              </div>
            </div>
            <div className="column">
              <div className="navbar-end has-text-centered">
                <a className="navbar-item" onClick={handleProfileClick}>
                  <FontAwesomeIcon icon={faUser} className="is-size-5 has-text-warning" />
                </a>
                {user && (
                    <a className="navbar-item" onClick={handleSignOut}>
                      Sign Out
                    </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
