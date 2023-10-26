import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../core/services/Slug'

const ProjectItem = ({ project }) => {

  /**
   * aplicate split to project title
   * @param {string} word project title
   * @returns string array
   */
  const getLetter = (word) => {
    return word.split('')
  }

  return (
    <>
      <Link to={`/projects/${slugify(project.name)}`}>
        <div className='project'>
          <div className='project__image'>
            <span className='project__date'>{project.date}</span>
            <img src={project.images[0]} alt="" />
            <span className='project__client'>{project.client}</span>
          </div>

          <div className='project__text spetial__content'>
            {
              [0, 1].map((iteration) => (
                <h2 className={`spetial__title ${iteration === 0 ? 'stroke' : ''}`} key={iteration}>
                  {
                    getLetter(project.name).map((letter, index) => {
                      return <span className={`${index === 0 ? 'spetial__letter' : ''}`} key={index}>{letter}</span>
                    })
                  }
                </h2>
              ))
            }
            <span className='project__type'>{project.type}</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProjectItem;
