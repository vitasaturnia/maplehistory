import * as React from "react";
import { Link } from "gatsby";
import quetzalcoatl from "../img/quetzalcoatl.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faDiscord,
  faFacebook,
  faHive,
  faTwitter

} from '@fortawesome/free-brands-svg-icons';


const Footer = class extends React.Component {
  render() {
    return (


      <footer className="footer has-background-black has-text-white-ter mt-6">
        <div className="has-text-centered has-background-black has-text-white-ter">
          <div className="has-background-black has-text-white-ter">
            <div style={{ maxWidth: "100vw" }} className="columns">
              <div className="column is-one-third ">
                <div className="columns">
                <div className="column is-half has-text-centered">
                  <ul className="menu-list">
                    <li>
                      <Link className="navbar-item has-text-warning" to="/about">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item has-text-warning " to="/charity">
                        Charity
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item has-text-warning" to="/wiki">
                        Wiki
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item has-text-warning" to="/myhistory">
                        Maple Book
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="column is-half has-text-centered">
                  <ul className="menu-list">
                    <li>
                      <Link className="navbar-item has-text-warning" to="/community">
                        Community
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item has-text-warning" to="/guild">
                        Guild
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item has-text-warning" to="/news">
                        News
                      </Link>
                    </li>
                  </ul>
                </div>
                </div>
              </div>

              <div className="column is-one-third social has-text-warning ">
                <div className="content has-text-centered">
                <img
                    src={quetzalcoatl}
                    alt="Maple History"
                    className=""
                    style={{ width: "14em", height: "10em" }}
                />
              </div>
              </div>


              <div className="column is-one-third social has-text-warning">
                <a title="discord" href="https://discord.gg/TcfrdVkdH2">
                  <FontAwesomeIcon icon={faDiscord} className="socialiconfooter is-size-1-widescreen has-text-warning"/>
                </a>
                <a title="facebook" href="https://www.facebook.com/Saturnian-107989921789037">
                  <FontAwesomeIcon icon={faFacebook} className="socialiconfooter has-text-warning is-size-1-widescreen"/>
                </a>



              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
