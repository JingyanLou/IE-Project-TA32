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
        const text = textRef.current;

        // Set initial state
        gsap.set(text.children, { autoAlpha: 0, y: 20 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=100%", // This makes the animation complete over one full scroll of the section
                pin: true,
                anticipatePin: 1,
                scrub: 1,
                onComplete: () => {
                    ScrollTrigger.getById("textRevealTrigger").kill();
                },
                id: "textRevealTrigger"
            }
        });

        // Reveal words
        tl.to(text.children, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.5,
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