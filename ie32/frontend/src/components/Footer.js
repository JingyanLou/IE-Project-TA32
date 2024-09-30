import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerContainerRef = useRef(null);

    useEffect(() => {
        const footerContainer = footerContainerRef.current;

        gsap.set(footerContainer, { yPercent: -50 });

        const uncover = gsap.timeline({ paused: true })
            .to(footerContainer, { yPercent: 0, ease: 'none' });

        ScrollTrigger.create({
            trigger: '#saving-tips',
            start: 'top top',
            end: '+=75%',
            animation: uncover,
            scrub: true,
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <footer className="footer-footer">
            <section ref={footerContainerRef} className="footer-container-footer">
                <div className="footer-content-footer">
                    <h2 className="brand-title-footer">Energise<br />Smart®</h2>
                    <div className="footer-features-footer">
                        <div className="feature-section-footer">
                            <h3 className="feature-title-footer">Estimate your home electricity bill</h3>
                            <ul className="feature-list-footer">
                                <li className="feature-item-footer">Start now</li>
                                <li className="feature-item-footer">Estimation user guide</li>
                            </ul>
                        </div>
                        <div className="feature-section-footer">
                            <h3 className="feature-title-footer">Explore more on home electricity saving tips</h3>
                            <ul className="feature-list-footer">
                                <li className="feature-item-footer">Replace your appliances</li>
                                <li className="feature-item-footer">Appliances saving tips</li>
                                <li className="feature-item-footer">Government programs</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;