import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './horizontalscroll.css';

gsap.registerPlugin(ScrollTrigger);

const cardData = [
    {
        image: '/images/problem1.jpg',
        year: '2024',
        title: 'Electricity Rate Increase',
        description: 'Easily estimate your electricity costs by entering your household details. Receive a personalized breakdown of your expected energy expenses, and see where you can reduce costs.'
    },
    {
        image: '/images/problem2.jpg',
        year: '2024',
        title: 'Rising Energy Demand',
        description: 'Analyze your energy consumption patterns and identify areas of high usage. Get tailored recommendations for energy-efficient appliances and practices.'
    },
    {
        image: '/images/problem3.jpg',
        year: '2024',
        title: 'Sustainable Solutions',
        description: 'Explore renewable energy options suitable for your home. Learn about solar panel installation, energy storage solutions, and government incentives for green energy adoption.'
    },
    // Add more card data as needed
];

const HorizontalScroll = () => {
    const racesRef = useRef(null);
    const racesWrapperRef = useRef(null);

    useEffect(() => {
        const races = racesRef.current;
        const racesWrapper = racesWrapperRef.current;
        const numSections = races.querySelectorAll('.horizontal-card-title').length;
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
                {cardData.map((card, index) => (
                    <div key={index} className="horizontal-card">
                        <img src={card.image} alt={card.title} className="horizontal-card-image" />
                        <div className="horizontal-card-content">
                            <p className="horizontal-card-year">{card.year}</p>
                            <h2 className="horizontal-card-title">{card.title}</h2>
                            <p className="horizontal-card-description">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HorizontalScroll;