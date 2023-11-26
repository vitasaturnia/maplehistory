import React from 'react';
import { useSpring, animated } from 'react-spring';

const FadeInWrapper = ({ children }) => {
    const animationProps = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0 },
        config: {
            tension: 200,  // Moderately high for a responsive start
            friction: 10,  // Balanced for a smooth yet noticeable effect
            mass: 1,       // Standard mass for natural movement
        },
    });

    return <animated.div style={animationProps}>{children}</animated.div>;
};

export default FadeInWrapper;
