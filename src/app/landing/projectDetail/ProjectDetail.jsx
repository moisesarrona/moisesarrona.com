import React from 'react'
import { useParams } from 'react-router-dom'
import { PROJECTS } from '../../core/data/projectData'
import useSlug from '../../hooks/Slug'

const ProjectDetail = () => {
  const slugify = useSlug()
  const { name } = useParams();

  /**
   * Find project from slug project name
   */
  const project = PROJECTS.find(p => slugify(p.name) === name);

  /**
   * get project name and convert to array for letter
   * @param {string} name project name
   * @returns string array
   */
  const titleWords = (name) => {
    return name.split('');
  }

  return (
    <>
      <section>
        <div className='content__project'>
          <a href={project.result} target='_blank' rel='noopener noreferrer' className='project__result box'>
            Result
          </a>

          <article>
            <div className='spetial__content'>
              <h1 className='spetial__title'>
                {
                  titleWords(project.name).map((letter, index) => {
                    return (
                      <span className={`${index === 0 ? 'spetial__letter' : ''}`} key={index}>{letter}</span>
                    )
                  })
                }
              </h1>
            </div>
            <p>{project.description}</p>
            <p>{project.challenge}</p>
          </article>

          <article>
            <div className="grid">
              <div className='card col__left'>
                <div className='card__body'>
                  <div className='card__subtitle'>Client: {project.client}</div>
                  <div className='card__subtitle'>Date: {project.date}</div>
                  <div className='card__subtitle'>Type project: {project.type}</div>
                </div>
                <div className='card__banner'>Project Details</div>
              </div>

              <div className='card col__right'>
                <div className='card__body'>
                  {
                    project.technologies.map((technology, index) => {
                      return (
                        <div className='card__subtitle' key={index}>
                          {technology}
                        </div>
                      )
                    })
                  }
                </div>
                <div className='card__banner'>Technologies</div>
              </div>
            </div>
          </article>

          <article>
            <div className='grid'>
              {
                project.images.map((image, index) => {
                  return (
                    <div className='image__container col__3' key={index}>
                      <img src={image} />
                    </div>
                  )
                })
              }
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default ProjectDetail