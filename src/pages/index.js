import React from 'react';
import Layout from "../components/Layout";

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
                        <h4 className="is-size-4 subtitle has-text-weight-semibold has-text-warning">
                            Create an Army
                        </h4>
                        <p>
                            The time is here. It's time to join forces with your fellow Maplers.
                            <br/>
                            "Unity is power."
                        </p>
                    </div>
                    <div className="column has-text-centered">
                        <h4 className="is-size-4 subtitle has-text-weight-semibold has-text-warning">
                            For the Cause
                        </h4>
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
