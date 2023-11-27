import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "./Newsletter";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import "./all.sass";


import FadeInWrapper from '../components/FadeInWrapper'; // Import FadeInWrapper

const TemplateWrapper = ({ children }) => {
    const { } = useSiteMetadata();

    return (
        <>
            <Helmet>
                <html lang="en" />
                <title>MapleHistory</title>
                <meta name="description" content="Writing Maple History" />

                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href={`${withPrefix("/")}img/leaf.png`}
                />
                <link
                    rel="icon"
                    type="image/png"
                    href={`${withPrefix("/")}img/leaf.png`}
                    sizes="32x32"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href={`${withPrefix("/")}img/leaf.png`}
                    sizes="16x16"
                />

                <link
                    rel="mask-icon"
                    href={`${withPrefix("/")}img/leaf.png`} // Corrected the file extension
                    color="#ff4400"
                />
                <meta name="theme-color" content="#fff" />

                <meta property="og:title" content="MapleHistory" />
                <meta
                    property="og:image"
                    content={`${withPrefix("/")}img/maplestoryog.png`}
                />
            </Helmet>
            <FadeInWrapper> {/* Wrap the content with FadeInWrapper */}
                <Navbar />
                <div className="content-container">{children}</div>
                <Newsletter />
                <Footer />
            </FadeInWrapper>
        </>
    );
};

export default TemplateWrapper;
