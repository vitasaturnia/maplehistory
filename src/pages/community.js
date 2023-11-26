import * as React from "react";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "gatsby";

import {
    faUsers,
} from '@fortawesome/free-solid-svg-icons';


const Community = () => (
  <Layout>

      <section className="minheight100">
          <div className="centeredcontainer">

              <div className="title has-text-centered has-text-link">
                  <FontAwesomeIcon icon={faUsers} className="is-size-1 nomargintop"/>
                  <h1 className="is-size-1">Community</h1>
              </div>

      <div className="columns has-text-centered">
          <div className="column has-text-centered is-one-quarter-tablet-only">
              <div className="title">
                  <a href="https://maplehistory.com">
                      <h1 className="has-text-warning ">MapleBook</h1>
                  </a>
              </div>
          </div>
          <div className="column has-text-centered">
              <div className="title">
                  <a href="https://discord.com/maplehistory">
                  <h3 className="has-text-warning">Discord</h3>
                  </a>
              </div>
          </div>
          <div className="column has-text-centered">
              <div className="title">
                  <a href="https://www.facebook.com/maplehistory">
                  <h3 className="has-text-warning">Facebook</h3>
                  </a>
              </div>
          </div>

      </div>
          </div>
      </section>

  </Layout>
);

export default Community;
