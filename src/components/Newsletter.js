import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    faEnvelope,

} from '@fortawesome/free-regular-svg-icons';

const Newsletter = () => (

    <section className="hero is-small is-link nomargintop">
        <div className="hero-body has-text-centered">
                <h1 className="subtitle has-text-warning">
                    Want to stay up to date?
                </h1>
                <div className="newslettercontainer has-text-warning">
                    <input className="newsletterinput" type="text" placeholder="Email"/>
                    <FontAwesomeIcon className="orangeicon is-large"  icon={faEnvelope} />
                </div>
        </div>
    </section>

);


export default Newsletter;
