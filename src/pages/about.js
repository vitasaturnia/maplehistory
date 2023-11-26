import React from "react";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "gatsby";
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const Community = () => {
    return (
        <Layout>
            <section className="community-section minheight100">
                <div className="centercontainer has-text-centered has-text-warning">
                    <div className="content">
                        <p className="subtitle is-large is-bold is-italic has-text-warning">
                            "In the book of life, you hold the pen. What story will you write today?"
                        </p>
                        <p>
                            It all started back in 2006 when I first entered the Maple World
                            playing in Bera. I was just a kid, and it was my best friend Klaas (shout out to you bro!)
                            who introduced me to this game that became a big part of my life. If I would show a maple character or play any Maplestory song to my mom, she would recognize it without thinking. She definitely started HATING Maplestory music with all the countless hours she heard me play.
                        </p>
                        <p>
                            Maple Story was my first MMORPG, and when I started playing, it
                            completely blew my mind. I was used to browser games, so the endless possibilities
                            had me hooked from the beginning.
                        </p>
                        <p>
                            God, however, operates in mysterious ways. I soon had
                            to move to a different city.
                            And funny enough, I met another mapler at my new school. Shout out to you Shahin!
                            He was playing Scania EU so I started playing EU server too. At the time as an assassin.
                        </p>
                        <p>
                            Fast forward to a life-changing moment on November 5th. I had a
                            motorcycle accident that left me unable to move my leg for two
                            weeks. I hit rock bottom, thinking I was never gonna walk again. During those days, Maplestory was my only source of happiness.
                        </p>
                        <p>
                            After recovering, I decided to take my Maple Story
                            journey to the next level. I want to reach endgame,
                            but more than that, I want to build a vibrant Maple Story community.
                            Maple for me has always been social more than anything, meeting new people, PQ runs, boss runs, quests. I think it's a
                            social game at its core, and from that rose my vision.
                        </p>
                        <p>
                            So, I invite you to join me on this Maple Story adventure. Join me on this Maple Story adventure, and together, let's explore Maple World, tackle tough challenges, and build a community that truly embodies the spirit of this incredible game. Maple Story isn't just a game; it's a shared experience, and I'm genuinely excited to share it with each and every one of you."
                        </p>
                        <p className="subtitle is-large is-bold is-italic has-text-warning">
                            "Prepare to embark on a Maple Story journey where we'll write history. Together, let's create a legendary story!"
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Community;
