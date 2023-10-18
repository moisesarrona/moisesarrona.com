import React from 'react'
import HomeLetters from './HomeLetters'
import { welcomeData } from '../../core/data/homeData'

const Home = () => {
  const titleWords = welcomeData.title.split('');

  /**
   * Generate random number
   * @returns random number
   */
  const randomClass= () => {
    return Math.floor(Math.random() * titleWords.length);
  }

  const randomOne = randomClass()
  const randomTwo = randomClass()

  return (
    <>
      <section>
        <div className='home__welcome'>
          <div className='spetial__content'>
            <h1 className='spetial__title'>
              {
               titleWords.map((letter, index) => {
                  const activeClass = randomOne===index? true : randomTwo===index? true : false
                  return (
                    <HomeLetters key={index} letter={letter} activeClass={activeClass}/>
                  )
                })
              }
            </h1>
            <span className='spetial__subtitle'>{welcomeData.subtitle}</span>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home