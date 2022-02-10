import * as React from "react";
import Layout from "../components/Layout";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    faUserGraduate
} from '@fortawesome/free-solid-svg-icons';

const Scholarships = () => (
    <Layout>
         <div className="title has-text-centered has-text-warning littlemargintop">
                <FontAwesomeIcon icon={faUserGraduate}/>
                <h3 className="">Scholarship program</h3>
            </div>

                <div className="fullscreen">
                    <div className="columns is-3">

                        <div className="column gridbox has-text-centered">
                            <Link to ="/axiescholarships" className="is-warning">
                                <div className="verticalhelper">
                                <StaticImage className="boximage" src="../img/axieinfinity.png" alt="Axie Infinity" placeholder="none"/>
                                </div>
                            </Link>
                        </div>

                        <div className="column gridbox level has-text-centered">
                            <Link to ="/splinterlandscarddelegation" className="is-warning" >
                                <div className="verticalhelper">
                                <StaticImage src="../img/splinterlands.png" alt="Splinterlands" placeholder="none" className=""/>
                                </div>
                            </Link>
                        </div>

                        <div className="column gridbox has-text-centered has-text-warning">
                            <Link to ="/thetanarenascholarships" className="is-warning">
                                <div className="verticalhelper">
                                    <StaticImage src="../img/thetanarena.png" alt="Thetan Arena" placeholder="none"/>
                                </div>
                            </Link>
                        </div>

                    </div>

                </div>
    </Layout>
);

export default Scholarships;
