import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './textreveal.css';

gsap.registerPlugin(ScrollTrigger);

const TextRevealSection = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const words = textRef.current.children;

        // Set initial state
        gsap.set(words, {
            opacity: 0,
            rotationX: () => gsap.utils.random(-90, 90),
            rotationY: () => gsap.utils.random(-90, 90),
            rotationZ: () => gsap.utils.random(-45, 45),
            x: () => gsap.utils.random(-500, 500),
            y: () => gsap.utils.random(-300, 300),
            z: () => gsap.utils.random(-500, 500),
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=150%",
                pin: true,
                anticipatePin: 1,
                scrub: 1,
                markers: true, // Remove this in production
            }
        });

        // Reveal words
        tl.to(words, {
            opacity: 1,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            x: 0,
            y: 0,
            z: 0,
            stagger: 0.1,
            duration: 2,
            ease: "power3.out",
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={sectionRef} className="text-reveal-section">
            <div ref={textRef} className="text-container">
                <span>When</span> <span>starting</span> <span>a</span> <span>new</span> <span>project,</span> <span>it's</span>
                <span>crucial</span> <span>to</span> <span>choose</span> <span>the</span> <span>appropriate</span>
                <span>tools.</span> <span>With</span> <span>prior</span> <span>experience</span> <span>in</span> <span>this</span>
                <span>area,</span> <span>I</span> <span>am</span> <span>confident</span> <span>in</span> <span>selecting</span> <span>the</span>
                <span>tools</span> <span>that</span> <span>will</span> <span>guide</span> <span>us</span> <span>to</span> <span>success.</span>
            </div>
        </div>
    );
};

export default TextRevealSection;