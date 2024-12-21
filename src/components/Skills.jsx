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

// Dynamically calculate boundary based on screen size
const getRandomPosition = (boundary) => ({
  x: Math.random() * boundary - boundary / 2,
  y: Math.random() * boundary - boundary / 2,
});

const skills = [
  {
    id: 1,
    icon: <FaJs />,
    name: "JavaScript",
    description: "JavaScript was my key to the enter the world of algorithms.",
  },
  {
    id: 2,
    icon: <FaReact />,
    name: "ReactJS",
    description:
      "I hated React untill I discovered libraries and made this portfolio.",
  },
  {
    id: 3,
    icon: <FaCss3Alt />,
    name: "CSS3",
    description: "This is where it all started, my first love in my dev life.",
  },
  {
    id: 4,
    icon: <FaNodeJs />,
    name: "NodeJS",
    description: "Not sure what it is yet but I know I need it.",
  },
  {
    id: 5,
    icon: <FaHtml5 />,
    name: "HTML5",
    description: "Respect your elders.",
  },
  {
    id: 6,
    icon: <LuPiano />,
    name: "Piano",
    description: "30 years of piano. Mostly Bach and jazz.",
  },
  {
    id: 7,
    icon: <SiMongodb />,
    name: "MongoDB",
    description: "EN PLEIN DATA GUEULE !",
  },
  {
    id: 8,
    icon: <FaGithub />,
    name: "GitHub",
    description: "I know git add, commit and push. That's all I need, right ?",
  },
  {
    id: 9,
    icon: <FaSass />,
    name: "Sass",
    description:
      "My appartment is a mess. But my CSS is now clean and organized.",
  },
  {
    id: 10,
    icon: <FaCannabis />,
    name: "Experienced grower",
    description: "Kids, say no to drugs. At least once.",
  },
  {
    id: 11,
    icon: <GiUnicycle />,
    name: "EUC enjoyer",
    description: "Electric Unicycle changed my life.",
  },
];

const Skills = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [positions, setPositions] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [boundary, setBoundary] = useState(300);

  useEffect(() => {
    // Adjust boundary based on screen size
    const updateBoundary = () => {
      setBoundary(window.innerWidth > 768 ? 500 : 300);
    };

    updateBoundary(); // Set initial boundary
    window.addEventListener("resize", updateBoundary);

    return () => window.removeEventListener("resize", updateBoundary);
  }, []);

  useEffect(() => {
    let interval;

    if (isExpanded) {
      // Generate initial positions
      setPositions(skills.map(() => getRandomPosition(boundary)));

      // Start randomizing positions every 2 seconds
      interval = setInterval(() => {
        setPositions(skills.map(() => getRandomPosition(boundary)));
      }, 2000);
    } else {
      // Clear the interval when skills collapse
      clearInterval(interval);
    }

    // Cleanup interval on component unmount or when `isExpanded` changes
    return () => clearInterval(interval);
  }, [isExpanded, boundary]); // Update when `boundary` changes

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
        <motion.div
          key={skill.id}
          className="skill-button"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isExpanded
              ? { x: positions[index]?.x || 0, y: positions[index]?.y || 0, scale: 1, opacity: 1 }
              : { x: 0, y: 0, scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onClick={() => handleSkillClick(skill)}
        >
          {skill.icon}
        </motion.div>
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
