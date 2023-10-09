import React from 'react'
import img from '../../assets/img/moy.png'

const Home = () => {
  return (
    <>
      <section>
        <div className='home__title'>
          <h1>hey</h1>
        </div>

        <div className='img'>
                <img src={img} alt="" />
            </div>
      </section>
    </>
  )
}

export default Home