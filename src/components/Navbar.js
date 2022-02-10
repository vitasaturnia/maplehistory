import React from "react";
import { Link } from "gatsby";
import logo from "../img/fenixlogo2.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";



const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
    };
  }

  toggleHamburger() {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active",
            })
          : this.setState({
              navBarActiveClass: "",
            });
      }
    );
  }

  render() {
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
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              role="menuitem"
              tabIndex={0}
              onKeyPress={() => this.toggleHamburger()}
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="column">
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/dao">
                Dao
              </Link>
              <Link className="navbar-item" to="/community">
                Community
              </Link>
              <Link className="navbar-item" to="/scholarships">
                Scholarships
              </Link>
              <Link className="navbar-item" to="/games">
                Games
              </Link>
              <Link className="navbar-item" to="/forum">
                Forum
              </Link>
            </div>
            </div>
            <div className="column">
            <div className="navbar-end has-text-centered">
              <a
                className="navbar-item"
                href="https://discord.gg/TcfrdVkdH2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faDiscord} className="socialiconfooter is-size-1-widescreen has-text-warning"/>
                </span>
              </a>
            </div>
          </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
