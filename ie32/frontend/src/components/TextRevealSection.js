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
            scale: 3,
            z: 1000,
            x: () => gsap.utils.random(-1000, 1000),
            y: () => gsap.utils.random(-500, 500),
            rotationX: () => gsap.utils.random(-90, 90),
            rotationY: () => gsap.utils.random(-90, 90),
            rotationZ: () => gsap.utils.random(-45, 45),
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=300%",
                pin: true,
                anticipatePin: 1,
                scrub: 1,
                // Remove this in production
            }
        });

        // Reveal words
        tl.to(words, {
            opacity: 1,
            scale: 1,
            z: 0,
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            stagger: 0.1,
            duration: 5,
            ease: "power3.out",
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={sectionRef} className="text-reveal-section">
            <div ref={textRef} className="text-container">
                <span>In</span> <span>30</span> <span>years,</span> <span>we</span> <span>envision</span> <span>a</span>
                <span>sustainable,</span> <span>energy-efficient</span> <span>Melbourne.</span> <span>Future</span>
                <span>generations</span> <span>will</span> <span>be</span> <span>proud</span> <span>of</span>
                <span>our</span> <span>resilience</span> <span>and</span> <span>innovation</span> <span>in</span>
                <span>facing</span> <span>environmental</span> <span>challenges.</span> <span>We</span>
                <span>hope</span> <span>they'll</span> <span>continue</span> <span>making</span> <span>responsible</span>
                <span>energy</span> <span>choices,</span> <span>ensuring</span> <span>a</span> <span>greener,</span>
                <span>affordable</span> <span>future</span> <span>for</span> <span>all.</span>
            </div>
        </div>
    );
};

export default TextRevealSection;