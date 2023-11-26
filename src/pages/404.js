import * as React from "react";
import Layout from "../components/Layout";
import logo from "../img/leaf.png";



const Forum = () => (

    <Layout>
        <section className="minheight100">
            <div className="centeredcontainer ">
                <div className="has-text-centered">
                    <img src={logo} className="herologo"/>
                </div>
                <div className="title has-text-centered has-text-warning">
                    <h3 className="">This page does not exist</h3>
                </div>
            </div>
        </section>
    </Layout>
);

export default Forum;
