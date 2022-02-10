import * as React from "react";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "gatsby";

import {
    faUsers,
} from '@fortawesome/free-solid-svg-icons';

import {faEnvelope} from "@fortawesome/free-regular-svg-icons";

const Community = () => (
  <Layout>

      <section className="hero is-large is-black">
          <div className="hero-body">

              <div className="title has-text-centered has-text-link">
                  <FontAwesomeIcon icon={faUsers} className="is-size-1 nomargintop"/>
                  <h1 className="is-size-1">Community</h1>
              </div>

      <div className="columns has-text-centered">
          <div className="column has-text-centered">
              <div className="title">
                  <a href="https://discord.gg/DVc9VSAFZr">
                      <h1 className="has-text-warning ">Discord server</h1>
                  </a>
              </div>
          </div>
          <div className="column has-text-centered">
              <div className="title">
                  <a href="https://ecency.com/trending/hive-14444">
                  <h3 className="has-text-warning">Hive community</h3>
                  </a>
              </div>
          </div>
          <div className="column has-text-centered">
              <div className="title">
                  <a href="https://www.facebook.com/groups/saturniannetwork/edit">
                  <h3 className="has-text-warning">Facebook group</h3>
                  </a>
              </div>
          </div>

      </div>
      <div className="columns has-text-centered">
          <div className="column has-text-centered">
              <div className="title">
                  <a href="https://www.facebook.com/Saturnian-107989921789037/">
                  <h3 className="has-text-warning">Facebook page</h3>
                  </a>
              </div>
          </div>
          <div className="column has-text-centered">
              <div className="title">
                  <Link to="/forum">
                  <h3 className="has-text-warning">Saturnian Forum</h3>
                  </Link>
              </div>
          </div>
          <div className="column has-text-centered">
              <div className="title">
                  <a href="https://www.hackforums.net">
                      <h3 className="has-text-warning">Hackforums crew</h3>
                  </a>
              </div>
          </div>
      </div>
          </div>
      </section>





  </Layout>
);

export default Community;
