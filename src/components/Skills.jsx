import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaJs,
  FaReact,
  FaCss3Alt,
  FaNodeJs,
  FaHtml5,
  FaGithub,
  FaSass,
} from "react-icons/fa";
import { LuPiano } from "react-icons/lu";
import { SiMongodb } from "react-icons/si";

const getRandomPosition = () => ({
  x: Math.random() * 300 - 150, // Random X (-150 to 150)
  y: Math.random() * 300 - 150, // Random Y (-150 to 150)
});

const SkillButton = ({ icon, position, isExpanded, index }) => {
  return (
    <motion.div
      className="skill-button"
      initial={{ scale: 0, opacity: 0 }}
      animate={
        isExpanded
          ? { x: position.x, y: position.y, scale: 1, opacity: 1 }
          : { x: 0, y: 0, scale: 0, opacity: 0 }
      }
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {icon}
    </motion.div>
  );
};

const skills = [
  { id: 1, icon: <FaJs />, name: "JavaScript" },
  { id: 2, icon: <FaReact />, name: "ReactJS" },
  { id: 3, icon: <FaCss3Alt />, name: "CSS3" },
  { id: 4, icon: <FaNodeJs />, name: "NodeJS" },
  { id: 5, icon: <FaHtml5 />, name: "HTML5" },
  { id: 6, icon: <LuPiano />, name: "Piano" },
  { id: 7, icon: <SiMongodb />, name: "MongoDB" },
  { id: 8, icon: <FaGithub />, name: "GitHub" },
  { id: 9, icon: <FaSass />, name: "Sass" },
];

const Skills = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    let interval;

    if (isExpanded) {
      // Generate initial positions
      setPositions(skills.map(() => getRandomPosition()));

      // Start randomizing positions every 2 seconds
      interval = setInterval(() => {
        setPositions(skills.map(() => getRandomPosition()));
      }, 2000);
    } else {
      // Clear the interval when skills collapse
      clearInterval(interval);
    }

    // Cleanup interval on component unmount or when `isExpanded` changes
    return () => clearInterval(interval);
  }, [isExpanded]);

  const toggleSkills = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="skills-container">
      {/* Central Button */}
      <motion.div
        className="central-button"
        onClick={toggleSkills}
        whileTap={{ scale: 0.9 }}
      >
        SKILLS
      </motion.div>

      {/* Skill Buttons */}
      {skills.map((skill, index) => (
        <SkillButton
          key={skill.id}
          icon={skill.icon}
          position={positions[index] || { x: 0, y: 0 }}
          isExpanded={isExpanded}
          index={index}
        />
      ))}
    </div>
  );
};

export default Skills;
