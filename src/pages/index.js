import React from "react";
import { navigate } from "gatsby-link"
import Layout from "../components/Layout";
import { Link, graphql } from "gatsby";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../img/fenixlogo2.png";
import metamask from "../img/metamask.svg";
import { useAuth } from "../hooks/useAuth";






function Index () {
    const { login, logout, currentUser } = useAuth();
    const user = currentUser();
    const userAddress = user?.get("ethAddress");

    React.useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user]);

    return(

    <Layout>
        <div className="hero is-large">
            <div className="hero-body is-black">
                    <p className="title has-text-warning has-text-centered">
                    Welcome to Saturnian Network
                </p>
                <div className="column has-text-warning has-text-centered">
                    <button className="button is-small loginbutton is-warning has-text-link ">
                        <p className="is-bold has-text-black">
                            Sign in
                        </p>
                    </button>
                    <button className="button is-small loginbutton is-link"
                            onClick={() => {
                                return login().catch((e) => {
                                    console.error(e);
                                });
                            }}>
                        <div className="columns ">
                            <div className="container">
                                <img src={metamask} className="herometaicon"/>
                            </div>
                        </div>
                    </button>
                </div>
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
                        members.
                        This way we intent to create a truely community based charity organization which not only
                        receives money through donations, but also through our coin and ecosystem.
                    </p>
                </div>
                <div className="column has-text-centered">
                    <h3 className="has-text-warning">
                        Create opportunities in less developed countries through scholarships
                    </h3>
                    <p>
                        More and more play to earn gamers making a living from gaming, this opens up many doors in alot
                        of less developed countries.
                        We give talented gamers the opportunity to earn money with theses <Link to="/games" className="is-warning">games</Link> without
                        the hefty investments needed.
                    </p>
                </div>
            </div>


            <div className="columns">

                <div className="column has-text-centered">
                    <h3 className="has-text-warning">
                        Create true value for our stakeholders and donators
                    </h3>
                    <p>
                        <p>
                            Our native token, SATURN; is in essence a dividend coin.
                            By holding saturn you earn a percentage of all money generated on the platform. This money
                            comes from our investments, scholarships, pools, adverrtisements and shop.

                        </p>
                    </p>
                </div>

                <div className="column has-text-centered">
                    <h3 className="has-text-warning">
                        Create a community of righteous people
                    </h3>
                    <p>
                        We believe that bringing together the right people is very powerful.
                        We offer ways for both investors, marketers and gamers to make money.
                        But in general, our tribe consists of visionairs, old souls that realize the power that crypto
                        has for our future.
                    </p>

                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>

            <div className="columns">
                <div className="column has-text-centered">

                    <div className="title has-text-centered">
                        <h3 className="is-uppercase has-text-link">6 Ways to earn</h3>
                    </div>
                </div>
            </div>
            <br/>
            <div className="columns content has-text-centered">
                <div className="column">
                    <h1 className="title is-size-1 has-text-warning has-text-weight-light">1</h1>
                    <h1 className="valuestitle has-text-link has-text-weight-light">
                        Play to earn
                    </h1>
                </div>
                <div className="column">
                    <h1 className="is-size-1 has-text-warning has-text-weight-light">2</h1>

                    <h1 className="title has-text-link has-text-weight-light">Rent to earn</h1>
                </div>

                <div className="column">
                    <h1 className="title is-size-1 has-text-warning has-text-weight-light">3</h1>

                    <h1 className="title has-text-link has-text-weight-light">Stake to earn</h1>
                </div>
            </div>
            <div className="columns content has-text-centered">
                <div className="column">
                    <h1 className="title is-size-1 has-text-warning has-text-weight-light">4</h1>
                    <h1 className="title has-text-link has-text-weight-light">Donate to earn</h1>
                </div>

                <div className="column">
                    <h1 className="is-size-1 has-text-warning has-text-weight-light">5</h1>

                    <h1 className="title has-text-link has-text-weight-light">Network to earn</h1>
                </div>

                <div className="column">
                    <h1 className="title is-size-1 has-text-warning has-text-weight-light">6</h1>
                    <h1 className="title has-text-link has-text-weight-light">Enjoy your dividends</h1>
                </div>
            </div>
        </div>

    </Layout>
);
};

export default Index;
