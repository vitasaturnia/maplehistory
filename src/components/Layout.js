import * as React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./all.sass";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import Newsletter from "./Newsletter";



const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (

    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
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
          href={`${withPrefix("/")}img/leaf.ng`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content="MapleHistory" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/maplestoryog.png`}
        />
      </Helmet>
      <Navbar />
      <div>{children}</div>
      <Newsletter />
      <Footer />
    </div>

  );
};

export default TemplateWrapper;
