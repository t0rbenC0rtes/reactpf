import React, { useEffect, useRef } from "react";
import HeroSvg from "./HeroSvg";
import Typed from "typed.js";
import Skills from "./Skills";

const About = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [
        "Hello!",
        "I'm learning web development.",
        "No one told me it would be so much fun!",
        "I'm hardly ever serious but...",
        "I'm always professional.",
        "I'm also a Bach worshipper.",
        "And I'm addicted to coffee.",
        "",
        "If you're interested...   ",
        "",
        "I'd love to work with you !",
        "",
        "",
        "",
        "Check out my creations ?",
      ],
      typeSpeed: 20,
      backSpeed: 10,
      loop: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <HeroSvg />
      <div className="typed-container">
        <span ref={typedElement} />
      </div>
      <Skills />
    </>
  );
};

export default About;
