import React from "react";
import { Link, navigate } from "gatsby";
import logo from "../img/fenixlogo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import netlifyIdentity from 'netlify-identity-widget';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
    };
  }

  componentDidMount() {
    netlifyIdentity.init();
  }

  toggleHamburger() {
    this.setState(
        {
          active: !this.state.active,
        },
        () => {
          this.state.active
              ? this.setState({ navBarActiveClass: "is-active" })
              : this.setState({ navBarActiveClass: "" });
        }
    );
  }

  handleProfileClick = () => {
    const user = netlifyIdentity.currentUser();
    if (user) {
      navigate('/myprofile');
    } else {
      netlifyIdentity.open();
    }
  };

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
                    onKeyPress={this.toggleHamburger}
                    onClick={this.toggleHamburger}
                >
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
            <div id="navMenu" className={`navbar-menu ${this.state.navBarActiveClass}`}>
              <div className="column">
                <div className="navbar-start has-text-centered">
                  {/* Other navbar items */}
                </div>
              </div>
              <div className="column">
                <div className="navbar-end has-text-centered">
                  <a className="navbar-item" onClick={this.handleProfileClick}>
                    <FontAwesomeIcon icon={faUser} className="is-size-5 has-text-warning"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
    );
  }
}

export default Navbar;
