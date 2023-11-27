import React from 'react';
import { navigate } from "gatsby-link";
import Layout from "../components/Layout";
import { Link, graphql } from "gatsby";

const Index = () => {
    return (
        <Layout>
            <section className="minheight100 ">
                <div className="centeredcontainer">
                    <p className="title has-text-warning has-text-centered">
                        Welcome to Maple History
                    </p>
                </div>
            </section>

            <div className="section has-background-white">
                <div className="columns">
                    <div className="column has-text-centered">
                        <div className="title">
                            <h3 className="is-size-2 is-uppercase has-text-link">
                                Our vision
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="columns ">
                    <div className="column has-text-centered">
                        <h3 className="is-size-3 subtitle has-text-weight-semibold has-text-warning">
                            Create an Army
                        </h3>
                        <p>
                            The time is here. It's time to join forces with your fellow Maplers.
                            <br/>
                            "Unity is power."
                        </p>
                    </div>
                    <div className="column has-text-centered">
                        <h3 className="is-size-3 subtitle has-text-weight-semibold has-text-warning">
                            For the Cause
                        </h3>
                        <p>
                           From giving gear to beginners, to helping the homeless community. One step at a time but sky is the limit.
                        </p>
                    </div>
                </div>


            </div>
        </Layout>
    );
};

export default Index;
