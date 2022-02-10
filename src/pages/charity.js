import * as React from "react";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from "../img/fenixlogo2.png";


const Charity = () => (
  <Layout>



          <div className="columns">
              <div className="column has-text-centered">
                  <section className="hero is-large is-black has-text-enter">
                      <div className="hero-body">
                          <div className="title has-text-centered has-text-warning">

                              <img src={logo} className="herologo"/>

                              <h3 className="">Coming soon</h3>
                          </div>
                      </div>
                  </section>
    </div>
</div>

  </Layout>
);

export default Charity;
