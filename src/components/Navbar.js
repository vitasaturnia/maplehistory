import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import Logo from "../img/leaf.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {

  return (
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src={Logo} className="navbarlogo" />
          </a>

          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">
              Home
            </a>

            <a class="navbar-item">
              Documentation
            </a>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                More
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item">
                  About
                </a>
                <a class="navbar-item">
                  Jobs
                </a>
                <a class="navbar-item">
                  Contact
                </a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-item">
                  <FontAwesomeIcon className="icon accounticon has-text-warning" icon={faUser}  size="3x"/>
              </div>
              <div className="navbar-dropdown ">
              <a className="navbar-item">
                Log in
            </a>
              </div>
              </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
