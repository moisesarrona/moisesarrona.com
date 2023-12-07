import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PROJECTS } from '../../core/data/projectData';
import useSlug from '../../hooks/useSlug';
import gsap from 'gsap';
import { useLoader } from '../../context/LoadContext';

const ProjectDetail = () => {
  const slugify = useSlug()
  const { name } = useParams();
  const project = PROJECTS.find(p => slugify(p.name) === name);
  const timeLine = gsap.timeline();
  const contentAnimRef = useRef();
  const resultAnimRef = useRef();
  const imageAnimRef = project.images.map(() => useRef());
  const { loaderFinished } = useLoader();

  /**
   * get project name and convert to array for letter
   * @param {string} name project name
   * @returns string array
   */
  const titleWords = (name) => {
    return name.split('');
  }

  /**
   * Start animations with gsap when loaded page
   */
  useEffect(() => {

    /**
     * Container animation
     */
    const contentAnimation = () => {
      if (contentAnimRef.current && resultAnimRef.current) {
        contentAnimRef.current.style.opacity = 0;
        contentAnimRef.current.style.top = '50px';

        resultAnimRef.current.style.opacity = 0;

        if (loaderFinished) {
          timeLine
            .to(contentAnimRef.current, {
              opacity: 1,
              top: 0,
              duration: 0.8
            })
            .to(resultAnimRef.current, {
              opacity: 1,
              ease: "bounce.out"
            }, '<')

        }
      }
    }

    /**
     * Animation to item when scrolling
     */
    const scrollAnimation = () => {
      project.images.forEach((images, index) => {
        if (imageAnimRef[index].current) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: imageAnimRef[index].current,
              scrub: 2,
              start: 'top center'
            }
          });
  
          tl
            .to(imageAnimRef[index].current, {
              scaleX: 0.7,
              scaleY: 1.3
            })
        }
      })
    }

    contentAnimation();
    scrollAnimation();

    return () => {
      gsap.killTweensOf([
        contentAnimRef,
        resultAnimRef,
        imageAnimRef
      ])
    }

  }, [loaderFinished])


  return (
    <>
      <section>
        <a href={project.result} target='_blank' rel='noopener noreferrer' className='project__result box' ref={resultAnimRef}>
          Result
        </a>

        <div className='content__project glass' ref={contentAnimRef}>
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
                    <div className='image__container col__3 project__image' key={index} ref={imageAnimRef[index]}>
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