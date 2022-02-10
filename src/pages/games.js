import * as React from "react";
import Layout from "../components/Layout";
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from "gatsby";

import {
    faGamepad
} from '@fortawesome/free-solid-svg-icons';


const Games = () => (
    <Layout>

                <div className="title has-text-centered has-text-warning littlemargintop">
                    <FontAwesomeIcon icon={faGamepad}/>
                    <h3 className="">Official Games</h3>
                </div>

            <div className="fullscreen">
                <div className="columns is-desktop">

                    <div className="column gridbox">
                        <Link to ="/axiescholarships" className="is-warning">
                            <div className="verticalhelper">
                                <StaticImage className="boximage" src="../img/axieinfinity.png" alt="Axie Infinity" placeholder="none"/>
                            </div>
                        </Link>
                    </div>

                    <div className="column gridbox">
                        <Link to ="/splinterlandscarddelegation" className="is-warning" >
                            <div className="verticalhelper">
                                <StaticImage src="../img/splinterlands.png" alt="Splinterlands" placeholder="none" className=""/>
                            </div>
                        </Link>
                    </div>

                    <div className="column gridbox">
                        <Link to ="/thetanarenascholarships" className="is-warning">
                            <div className="verticalhelper">
                                <StaticImage src="../img/thetanarena.png" alt="Thetan Arena"/>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>


        <div className="fullscreen">

                <div className="columns">

                <div className="column gridbox">
                    <div className="verticalhelper">
                        <StaticImage className="boximage" src="../img/crazydefenseheroes.jpeg" alt="Crazy Defense Heroes"/>
                    </div>
                </div>

                <div className="column gridbox">
                    <div className="verticalhelper">
                        <StaticImage className="fillupyomomma" src="../img/hashkings.png" alt="Hashkings"/>
                    </div>
                </div>

                <div className="column gridbox">
                    <div className="verticalhelper">
                        <StaticImage src="../img/embersword.png" alt="Ember sword" placeholder="none"/>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
);

export default Games;
