import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faLinkedinIn, faCodepen } from '@fortawesome/free-brands-svg-icons'
import img from '../../assets/img/me.png'
import { ABOUT, SKILLS, STUDIES, CONTACT } from '../core/data/aboutData'

const About = () => {
  return (
    <section>
      <div className='content__about'>
        <article>
          <div className='spetial__content'>
            <h1 className='spetial__title'><span className='spetial__letter neon'>W</span>ho I'm?</h1>
          </div>

          {
            ABOUT.map((item, index) => {
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
                      <div className='skill__color' style={{ width: item.percent }}>
                        <span className='skill__percent'>{item.percent}</span>
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
                  <div className='card col__2' key={index}>
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
            <div className="col__left">
              <div className="grid">
                <div className='contact__profile col__2'>
                  <img src={img} className='contact__img' alt="i'm moy" />
                  <a href='https://github.com/moisesarrona'
                    target='_blank'
                    className='contact_link'>@moisesarrona</a>
                </div>

                <div className="contact__social col__1">
                  {
                    CONTACT
                      .filter(item => item.name !== 'github')
                      .map((item, index) => {

                        const resolvedIcon = item.name === "instagram" ? faInstagram :
                          item.name === "linkedin" ? faLinkedinIn :
                            item.name === "correo" ? faEnvelope : 
                            item.name === "codepen"? faCodepen : null;
                        const typeLink = item.name === "correo" ? "mailto:" : ""

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