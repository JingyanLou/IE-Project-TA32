import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './problemsection.css';

gsap.registerPlugin(ScrollTrigger);

const ProblemSection = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    const problems = [
        "Energy Poverty",
        "Rising Electricity Costs",
        "Unsustainable Consumption",
        "Environmental Impact",
        "Central Challenge",
        "Environmental Impact",
        "Central Challenge",
        "Environmental Impact",
        "Central Challenge",
        "Environmental Impact",
        "Central Challenge",
        "Environmental Impact",
        "Central Challenge",
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const textWrapper = textRef.current;

        console.log('Section ref:', section);
        console.log('Text wrapper ref:', textWrapper);

        let textWidth = textWrapper.offsetWidth;
        let amountToScroll = textWidth - window.innerWidth;

        console.log('Text width:', textWidth);
        console.log('Amount to scroll:', amountToScroll);

        const tween = gsap.to(textWrapper, {
            x: -amountToScroll,
            ease: "none"
        });

        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${amountToScroll}`,
            pin: true,
            animation: tween,
            scrub: 1,
            markers: true,
            onEnter: () => console.log('ScrollTrigger: Enter'),
            onLeave: () => console.log('ScrollTrigger: Leave'),
            onEnterBack: () => console.log('ScrollTrigger: Enter Back'),
            onLeaveBack: () => console.log('ScrollTrigger: Leave Back'),
            onUpdate: (self) => console.log('ScrollTrigger progress:', self.progress)
        });

    }, []);

    return (
        <section ref={sectionRef} className="problem-section">
            <div ref={textRef} className="problem-text-wrapper">
                {problems.map((problem, index) => (
                    <h2 key={index} className="problem-text">{problem}</h2>
                ))}
            </div>
        </section>
    );
};

export default ProblemSection;