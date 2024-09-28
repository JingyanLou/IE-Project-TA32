import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './horizontalscroll.css';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
    const racesRef = useRef(null);
    const racesWrapperRef = useRef(null);

    useEffect(() => {
        const races = racesRef.current;
        const racesWrapper = racesWrapperRef.current;
        const numSections = races.querySelectorAll('h2').length;
        const racesWidth = numSections * 100; // 40vw content + 20vw margin per section

        races.style.width = `${racesWidth}vw`;

        const animation = gsap.to(races, {
            x: () => `-${(numSections - 1) * 100}vw`,
            ease: "none",
            scrollTrigger: {
                trigger: racesWrapper,
                start: "top top",
                end: () => `+=${racesWidth * 1}vw`,
                pin: true,
                scrub: 0.8,
                invalidateOnRefresh: true,
            }
        });

        const handleResize = () => {
            races.style.width = `${numSections * 100}vw`;
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            animation.kill();
        };
    }, []);

    return (
        <div ref={racesWrapperRef} className="racesWrapper">
            <div ref={racesRef} className="races">
                <h2>Monaco</h2>
                <h2>Austria</h2>
                <h2>Hungary</h2>
                <h2>Netherlands</h2>
                <h2>Japan</h2>
            </div>
        </div>
    );
};

export default HorizontalScroll;