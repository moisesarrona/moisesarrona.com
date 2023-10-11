import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import img from '../../assets/img/me.png'
import { INFO, SKILLS, STUDIES, CONTACT } from '../core/data/aboutData'

const About = () => {
  return (
    <section>
      <div className='content__about'>
        <article>
          <h1>Who I am?</h1>

          {
            INFO.map((item, index) => {
              return (
                <p key={index}>{item}</p>
              )
            })
          }
        </article>

        <article>
          <h2>What do i know do?</h2>

          <div className='grid'>
            {
              SKILLS.map((item, index) => {
                return (
                  <div className='skill' key={index}>
                    <div className='skill__name'>{item.name}</div>
                    <div className='skill__line'>
                      <div className='skill__color' style={{ width: item.percennt }}>
                        <span className='skill__percent'>{item.percennt}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </article>

        <article>
          <h2>What're my academic studies?</h2>

          <div className="grid">
            {
              STUDIES.reverse().map((item, index) => {
                return (
                  <div className='card col--2' key={index}>
                    <div className='card__body'>
                      <div className='card__title'>{item.title}</div>
                      <div className='card__subtitle'>{item.academy}</div>
                    </div>
                    <div className='card__banner'>{item.period}</div>
                  </div>
                )
              })
            }
          </div>
        </article>

        <article>
          <h2>Do you like contact me?</h2>

          <div className="grid">
            <div className="col--left">
              <div className="grid">
                <div className='contact__profile col--2'>
                  <img src={img} className='contact__img' alt="i'm moy" />
                  <a href='https://github.com/moisesarrona'
                    target='_blank'
                    className='contact_link'>@moisesarrona</a>
                </div>

                <div className="contact__social col--1">
                  {
                    CONTACT
                      .filter(item => item.name !== 'github')
                      .map((item, index) => {
                        
                        const resolvedIcon = item.name === "instagram" ? faInstagram : 
                        item.name === "linkedin" ? faLinkedinIn : 
                        item.name === "correo"? faEnvelope : null;
                        const typeLink = item.name === "correo"? "mailto:" : ""

                        return (
                          <div className='card' key={index}>
                            <div className="card__body">
                              <div className='card__title'>
                                <a href={typeLink + item.link} target="_blank" rel="noopener noreferrer">
                                  <FontAwesomeIcon icon={resolvedIcon} />
                                </a>
                                <a href="mailto:"></a>
                              </div>
                            </div>
                          </div>
                        )
                      })
                  }
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

  )
}

export default About