import React from "react";
import { motion } from "framer-motion";
import projects from "../projects";

const Work = ({ title, description, link, image }) => {
  return (
    <div className="work">
      <div className="work-details">
        <h4>{title}</h4>
        <p>{description}</p>
        <a
          className="projectLink"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project
        </a>
      </div>
      <img src={image} alt={`${title} thumbnail`} className="work-image" />
    </div>
  );
};

const AccordionItem = ({ month, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="accordion-item">
      <motion.div
        className="accordion-header"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <h3>{month}</h3>
      </motion.div>
      {isOpen && (
        <motion.div
          className="accordion-content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

const Works = () => {
  return (
    <div className="works-container">
      <div className="works">
        {Object.entries(projects).map(([month, projects]) => (
          <AccordionItem key={month} month={month}>
            {projects.map((project) => (
              <Work
                key={project.id}
                title={project.title}
                description={project.description}
                link={project.link}
                image={project.image}
              />
            ))}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};

export default Works;
