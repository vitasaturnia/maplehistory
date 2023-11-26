// src/components/FadeInWrapper.js
import React from 'react';
import { useSpring, animated } from 'react-spring';

const FadeInWrapper = ({ children }) => {
    const animationProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 1000 },
    });

    return <animated.div style={animationProps}>{children}</animated.div>;
};

export default FadeInWrapper;
