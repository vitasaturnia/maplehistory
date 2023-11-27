import React, { useState, useEffect, useRef } from "react";
import { Link, navigate } from "gatsby";
import logo from "../img/mushroom.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { auth } from '../../firebase'; // Ensure this path is correct
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const toggleHamburger = () => {
    setActive((prevActive) => !prevActive);
  };

  const toggleDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.classList.toggle('is-active');
    }
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
      <nav className="navbar is-transparent is-desktop" role="navigation" aria-label="main-navigation">
        <div className="container">
          <div className="column">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item" title="logo">
                <img src={logo} alt="MapleHistory" className="logoclass" />
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
            <div className="column flexbasisauto">
              <div className="navbar-start has-text-centered">
                <Link className="navbar-item" to="/about">
                  About
                </Link>
                <Link className="navbar-item" to="/wiki">
                  Wiki
                </Link>
                <Link className="navbar-item" to="/guild">
                  Guild
                </Link>
                <Link className="navbar-item" to="/community">
                  Community
                </Link>
                <Link className="navbar-item" to="/feed">
                  Maple Book
                </Link>
                <Link className="navbar-item" to="/contact">
                  Contact
                </Link>
              </div>
            </div>
            <div className="column">
              <div className="navbar-end has-text-centered">
                {/* Dropdown */}
                <div className="navbar-item has-dropdown is-hoverable" ref={dropdownRef}>
                  <a className="navbar-link" onClick={toggleDropdown}>
                    <FontAwesomeIcon icon={faUser} className="is-size-5 has-text-warning accountsymbol" />
                  </a>
                  <div className="navbar-dropdown" style={{ backgroundColor: 'black' }}>
                    {user ? (
                        <>
                          <div className="perfectcenter">

                          <Link to="/myprofile" className="navbar-item">
                            My Profile
                          </Link>
                          <Link to="/editprofile" className="navbar-item">
                            Edit Profile
                          </Link>
                          <a className="navbar-item" onClick={handleSignOut}>
                            Logout
                          </a>
                          </div>
                        </>
                    ) : (
                        <Link to="/login" className="navbar-item">
                          Login
                        </Link>
                    )}
                  </div>
                </div>
                {/* End Dropdown */}
              </div>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
