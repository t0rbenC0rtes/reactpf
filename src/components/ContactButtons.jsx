import React, { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaCodepen,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import { div } from "framer-motion/client";

const getRandomPosition = (boundary = 100) => ({
  x: Math.random() * boundary * 2 - boundary,
  y: Math.random() * boundary * 2 - boundary,
});

const contactLinks = [
  {
    id: 1,
    icon: <FaEnvelope />,
    link: "mailto:antoinelaf@gmail.com",
    name: "Email",
  },
  {
    id: 2,
    icon: <FaGithub />,
    link: "https://github.com/t0rbenC0rtes",
    name: "GitHub",
  },
  {
    id: 3,
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/alafontaine/",
    name: "LinkedIn",
  },
  {
    id: 4,
    icon: <FaCodepen />,
    link: "https://codepen.io/Antoine-Lafontaine",
    name: "CodePen",
  },
  {
    id: 5,
    icon: <FaInstagram />,
    link: "https://www.instagram.com/t0rbenc0rtes/",
    name: "Instagram",
  },
];

const ContactButtons = () => {
  const [positions, setPositions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const [showParagraph, setShowParagraph] = useState(false);

  useEffect(() => {
    const initialPositions = contactLinks.map(() => getRandomPosition(150));
    setPositions(initialPositions);

    // Show paragraph after 20 seconds
    const timer = setTimeout(() => {
      setShowParagraph(true);
    }, 15000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  const createFloatingAnimation = () => ({
    x: [0, getRandomPosition(150).x, getRandomPosition(150).x],
    y: [0, getRandomPosition(150).y, getRandomPosition(150).y],
    transition: {
      duration: 10, // Adjust duration for slower or faster movement
      repeat: Infinity,
      repeatType: "mirror", // Makes the animation reverse and look smooth
      ease: "linear",
    },
  });

  const handleClick = (contact) => {
    setSelectedLink(contact);
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (selectedLink) {
      window.open(selectedLink.link, "_blank", "noopener,noreferrer");
      setShowModal(false);
      setSelectedLink(null);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedLink(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleCancel();
    }
  };

  return (
    <>
      {showParagraph && (
        <p className="delayed-paragraph">
          If the icons are too hard to click, you're not trying hard enough.{" "}
          <br /> My email is <span>antoinelaf@gmail.com</span>
        </p>
      )}
      <div className="contact-buttons-container">
        {contactLinks.map((contact, index) => (
          <motion.div
            key={contact.id}
            className="contact-button"
            animate={createFloatingAnimation(index)}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "linear",
            }}
            onClick={() => handleClick(contact)}
          >
            {contact.icon}
          </motion.div>
        ))}

        {showModal && (
          <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
              <p>Open my {selectedLink?.name}?</p>
              <div>{selectedLink?.icon}</div>
              <button onClick={handleConfirm}>Yes</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactButtons;
