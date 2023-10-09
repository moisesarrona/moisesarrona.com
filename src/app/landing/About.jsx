import React from 'react'

const INFO = [
  "My name is Moises Arrona I'm Software Engineer and Software Architect and I worked with any lenguages I know about BackEnd and FrontEnd, I currently live in Mexico and I work as an Software Architect",
  "I like to learn about technology, programming lenguages, software architects, technology tools and I create projects open source as a hobby, well I also like to play guitar.",
  "I worked at Werkn as a Frontend Developer, Grupo Castores as a Software Engineer, currently working at Flecha Amarilla as a Software Architect. My activities at GFA are: proposing technological solutions, architectural solutions to migrate systems and for new developments. Create and Propose guidelines, design patterns, standards. Provide research and technical training. Develop proofs of concept."
]

const SKILLS = [
  {
    name: "Java / SpringBoot",
    percennt: "90%"
  },
  {
    name: "C# / .ASP.NET",
    percennt: "50%"
  },
  {
    name: "PHP / Laravel",
    percennt: "95%"
  },
  {
    name: "React",
    percennt: "60%"
  },
  {
    name: "Angular",
    percennt: "90%"
  },
  {
    name: "Git / GitHub",
    percennt: "90%"
  },
  {
    name: "SQLServer / MySql",
    percennt: "80%"
  }
]

const STUDIES = [
  {
    id: 1,
    academy: "Universidad Tecnológica de León",
    // period: "Sept 2016 - Ago 2018",
    period: "2016 - 2018",
    title: "TSU en Multimedia y Comercio Electrónico"
  },
  {
    id: 2,
    academy: "Universidad Tecnológica de León",
    // period: "Sept 2018 - Abr 2020",
    period: "2018 - 2020",
    title: "Ingeniería en Tecnologías de la Información"
  },
]

const About = () => {
  return (
    <section>
      <div className='content__about'>
        <article>
          <h1>Who I am?</h1>
          {
            INFO.map((item, index) => {
              return (
                <p key={ index }>{ item }</p>
              )
            })
          }
        </article>

        <article>
          <h2>What do i know do?</h2>
          <div className='grid'>
            {
              SKILLS.map((item, index) => {
                return(
                  <div className='skill' key={ index }>
                    <div className='skill__name'>{ item.name }</div>
                    <div className='skill__line'>
                      <div className='skill__color' style={{ width: item.percennt }}>
                        <span className='skill__percent'>{ item.percennt }</span>
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
                  <div className='card col--2' key={ index }>
                    <div className='card__body'>
                      <div className='card__title'>{ item.title }</div>
                      <div className='card__subtitle'>{ item.academy }</div>
                    </div>
                    <div className='card__banner'>{ item.period }</div>
                  </div>
                )
              })
            }
          </div>
        </article>
      </div>
    </section>

  )
}

export default About