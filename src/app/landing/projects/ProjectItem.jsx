import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useSlug from '../../hooks/useSlug'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useLoader } from '../../context/LoadContext';

gsap.registerPlugin(ScrollTrigger);

const ProjectItem = ({ project }) => {
  const slugify = useSlug();
  const loaderFinished = useLoader();
  const itemAnimRef = useRef();
  const itemImageAnimRef = useRef();
  const itemTextAnimRef = useRef();
  let timeLine = gsap.timeline();

  /**
   * aplicate split to project title
   * @param {string} word project title
   * @returns string array
   */
  const getLetter = (word) => {
    return word.split('')
  }

  /**
   * Start animations with gsap when loaded page
   */
  useEffect(() => {

    /**
     * Animation when the component started
     */
    const startAnimation = () => {
      if (itemAnimRef.current) {
        timeLine.from(itemAnimRef.current, {
          opacity: 0.8,
          scale: 0.9,
        })
      }
    }

    /**
     * Animation to item when scrolling
     */
    const scrollAnimation = () => {
      if(itemAnimRef.current && itemTextAnimRef.current && itemImageAnimRef.current) {
        timeLine = gsap.timeline({
          scrollTrigger: {
            trigger: itemAnimRef.current,
            scrub: 2,
            start: 'top center'
          }
        });

        timeLine
        .to(itemImageAnimRef.current, {
          scaleX: 0.7,
          scaleY: 1.3
        })
        .to(itemTextAnimRef.current, {
          bottom: '200px',
        }, '<')
      }
    }

    startAnimation();
    scrollAnimation();

  }, [project])
  

  return (
    <>
      <Link to={`/projects/${slugify(project.name)}`}>
        <div className='project' ref={itemAnimRef}>
          <div className='project__image' ref={itemImageAnimRef}>
            <span className='project__date'>{project.date}</span>
            <img src={project.images[0]} alt="" />
            <span className='project__client'>{project.client}</span>
          </div>

          <div className='project__text spetial__content' ref={itemTextAnimRef}>
            {
              [0, 1].map((iteration) => (
                <h2 className={`spetial__title ${iteration === 0 ? 'stroke' : 'stroke__none'}`} key={iteration}>
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
