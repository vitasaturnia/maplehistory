import * as React from "react";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    faWrench
} from '@fortawesome/free-solid-svg-icons';
import logo from "../img/fenixlogo2.png";

const Shop = () => (
    <Layout>
        <div className="columns">
            <div className="column has-text-centered">
                <section className="hero is-large is-black">
                    <div className="hero-body">
                        <img src={logo} className="herologo"/>
                        <div className="title has-text-centered has-text-warning">
                            <h3 className="">Coming soon</h3>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    </Layout>
);

export default Shop;
