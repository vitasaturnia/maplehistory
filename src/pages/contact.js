import * as React from "react";
import Layout from "../components/Layout";
import ContactForm from "../components/ContactForm";
import { Link } from "gatsby";



const Community = () => (
  <Layout>

      <section className="minheight100">
          <div className="centeredcontainer">

              <ContactForm/>

          </div>
      </section>
  </Layout>
);

export default Community;
