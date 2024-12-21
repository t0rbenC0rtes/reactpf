import React from "react";
import { motion } from "framer-motion";

const Modal = ({ isVisible, onClose, skill }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2>{skill.name}</h2>
        <div>{skill.icon}</div>
        <p>{skill.description}</p>
        <button onClick={onClose}>Close</button>
      </motion.div>
    </div>
  );
};

export default Modal;
