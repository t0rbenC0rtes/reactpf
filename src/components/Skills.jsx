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
  FaCannabis,
} from "react-icons/fa";
import { LuPiano } from "react-icons/lu";
import { SiMongodb } from "react-icons/si";
import { GiUnicycle } from "react-icons/gi";
import Modal from "./Modal";

const getRandomPosition = () => ({
  x: Math.random() * 300 - 150,
  y: Math.random() * 300 - 150,
});

const SkillButton = ({ icon, position, isExpanded, index, onClick }) => {
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
      onClick={onClick} // Pass the onClick handler
    >
      {icon}
    </motion.div>
  );
};

const skills = [
  { id: 1, icon: <FaJs />, name: "JavaScript", description: "JavaScript was my key to the enter the world of algorithms." },
  { id: 2, icon: <FaReact />, name: "ReactJS", description: "I hated React untill I discovered libraries and made this portfolio." },
  { id: 3, icon: <FaCss3Alt />, name: "CSS3", description: "This is where it all started, my first love in my dev life." },
  { id: 4, icon: <FaNodeJs />, name: "NodeJS", description: "Not sure what it is yet but I know I need it." },
  { id: 5, icon: <FaHtml5 />, name: "HTML5", description: "Respect your elders." },
  { id: 6, icon: <LuPiano />, name: "Piano", description: "30 years of piano. Mostly Bach and jazz." },
  { id: 7, icon: <SiMongodb />, name: "MongoDB", description: "EN PLEIN DATA GUEULE !" },
  { id: 8, icon: <FaGithub />, name: "GitHub", description: "I know git add, commit and push. That's all I need, right ?" },
  { id: 9, icon: <FaSass />, name: "Sass", description: "My appartment is a mess. But my CSS is now clean and organized." },
  { id: 10, icon: <FaCannabis />, name: "Experienced grower", description: "Kids, say no to drugs. At least once." },
  { id: 11, icon: <GiUnicycle />, name: "EUC enjoyer", description: "Electric Unicycle changed my life." },
];


const Skills = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [positions, setPositions] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedSkill(null);
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
          onClick={() => handleSkillClick(skill)} // Pass the click handler
        />
      ))}

      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        onClose={closeModal}
        skill={selectedSkill}
      />
    </div>
  );
};

export default Skills;
 