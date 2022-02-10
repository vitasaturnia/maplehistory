import * as React from "react";
import Layout from "../components/Layout";
import logo from "../img/fenixlogo2.png"

const SplinterlandsCardDelegation = () => (

    <Layout>
        <section className="hero is-medium is-black">
            <div className="hero-body">
                <div className="title has-text-centered has-text-warning">
                    <img src={logo} className="herologo"/>
                    <br/>
                    <br/>
                    <h3 className="">Card Delegation Program</h3>
                </div>
            </div>
        </section>

    </Layout>
);

export default SplinterlandsCardDelegation;
