import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedinIn, faCodepen, faGithub } from '@fortawesome/free-brands-svg-icons';
import { ABOUT, SKILLS, STUDIES, CONTACT } from '../../core/data/aboutData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useLoader } from '../../context/LoadContext';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { loaderFinished } = useLoader();
  const contentAnimRef = useRef();
  const percentRefs = SKILLS.map(() => useRef());
  const timeLine = gsap.timeline();

  /**
   * Start animations with gsap when loaded page
   */
  useEffect(() => {

    /**
     * Container animation
     */
    const contentAnimation = () => {
      if (contentAnimRef.current) {
        contentAnimRef.current.style.opacity = 0;
        contentAnimRef.current.style.top = '50px';

        if (loaderFinished) {
          timeLine.to(contentAnimRef.current, {
            opacity: 1,
            top: 0,
            duration: 0.8
          })

        }
      }
    }

    contentAnimation();

    return () => {
      gsap.killTweensOf([
        contentAnimRef.current
      ])
    }

  }, [loaderFinished])

  /**
   * Start animations
   */
  useEffect(() => {

    /**
     * Percent skill animation
     */
    const percentAnimation = () => {
      SKILLS.forEach((skill, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: percentRefs[index].current,
            toggleActions: 'restart'
          },
        });

        tl.from(percentRefs[index].current, {
          width: 0,
          duration: 1.3,
          ease: "bounce.out"
        });
      });
    };

    percentAnimation();

    return () => {
      gsap.killTweensOf([
        percentRefs.current,
        contentAnimRef.current
      ])
    }
  }, [])

  return (
    <section>
      <div className='content__about glass' ref={contentAnimRef}>
        <article>
          <div className='spetial__content'>
            <h1 className='spetial__title'><span className='spetial__letter'>¿Q</span>uién soy?</h1>
          </div>

          {
            ABOUT.map((text, index) => {
              return (
                <p key={index}>{text}</p>
              )
            })
          }
        </article>

        <article>
          <h2>¿Qué conozco?</h2>

          <div className='grid'>
            {
              SKILLS.map((skill, index) => {
                return (
                  <div className='skill' key={index}>
                    <div className='skill__name'>{skill.name}</div>
                    <div className='skill__line'>
                      <div className='skill__color' style={{ width: skill.percent }} ref={percentRefs[index]}>
                        <span className='skill__percent'>{skill.percent}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </article>

        <article>
          <h2>¿Qué estudié?</h2>

          <div className="grid">
            {
              STUDIES.reverse().map((studie, index) => {
                return (
                  <div className='card col__2' key={index}>
                    <div className='card__body'>
                      <div className='card__title'>{studie.title}</div>
                      <div className='card__subtitle'>{studie.academy}</div>
                    </div>
                    <div className='card__banner'>{studie.period}</div>
                  </div>
                )
              })
            }
          </div>
        </article>

        <article>
          <a href={`mailto:${CONTACT[3].link}`}>
            <h2 className='contact__text'>Contactame</h2>
          </a>

          <div className="grid">
            <div className="col__2">
              <div className="contact__wrap">
                {
                  CONTACT
                    .filter(link => link.name !== 'correo' && link.name !== 'instagram')
                    .map((link, index) => {

                      const resolvedIcon = link.name === "instagram" ? faInstagram :
                        link.name === "linkedin" ? faLinkedinIn :
                          link.name === "correo" ? faEnvelope :
                            link.name === "codepen" ? faCodepen : 
                            link.name === "github" ? faGithub : null;
                      const typeLink = link.name === "correo" ? "mailto:" : ""

                      return (
                        <div className="contact__item" key={index}>
                          <a href={typeLink + link.link} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={resolvedIcon} />
                          </a>
                        </div>
                      )
                    })
                }
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

  )
}

export default About