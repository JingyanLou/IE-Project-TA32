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
        description: 'Electricity peak prices in Victoria have nearly doubled over the last six months, significantly impacting households. The average customer now faces an annual increase of $352 in electricity costs, marking a 25% rise compared to last year.'
    },
    {
        image: '/images/problem2.jpg',
        year: '2024',
        title: 'Energy Poverty',
        description: "Rising energy prices are forcing Melbourne's middle-to low-income families to cut back on essentials like heating. During winter, energy poverty threatens even more households with cold homes and health risks due to disconnections."
    },
    {
        image: '/images/problem3.jpg',
        year: '2024',
        title: 'Residents struggle to pay bills',
        description: 'Energy affordability has shifted from a marginal concern to a mainstream crisis. Recent research shows that over a quarter (28%) of people struggled to pay their energy bills in the past year, and 37% expect to face even greater difficulties in the coming years.'
        // Add more card data as needed
    }
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