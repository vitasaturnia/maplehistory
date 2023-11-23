import React from 'react';
import { navigate } from "gatsby-link";
import Layout from "../components/Layout";
import { Link, graphql } from "gatsby";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../img/fenixlogo2.png";

const Index = () => {
    return (
        <Layout>
            <div className="hero is-large">
                <div className="hero-body is-black">
                    <p className="title has-text-warning has-text-centered">
                        Welcome to Maple History
                    </p>
                </div>
            </div>

            <div className="section has-background-white">
                <div className="columns">
                    <div className="column has-text-centered">
                        <div className="title">
                            <h3 className="is-uppercase has-text-link">
                                Our vision
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column has-text-centered">
                        <h3 className="has-text-warning">
                            Raise and generate money for fair charity based on governance
                        </h3>
                        <p>
                            We are a decentralized autononomous organization, so all decisions are made by community
                            members. This way we intent to create a truely community based charity organization which not only
                            receives money through donations, but also through our coin and ecosystem.
                        </p>
                    </div>
                    <div className="column has-text-centered">
                        <h3 className="has-text-warning">
                            Create opportunities in less developed countries through scholarships
                        </h3>
                        <p>
                            More and more play to earn gamers making a living from gaming, this opens up many doors in a lot
                            of less developed countries. We give talented gamers the opportunity to earn money with these <Link to="/games" className="is-warning">games</Link> without
                            the hefty investments needed.
                        </p>
                    </div>
                </div>

                {/* ... (rest of the content remains the same) ... */}

            </div>
        </Layout>
    );
};

export default Index;
