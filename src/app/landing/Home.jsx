import React from 'react'
import img from '../../assets/img/moy.png'

const Home = () => {
  return (
    <>
        <section className='home'>
            <div className='title'>
                <h2>hey</h2>
            </div>

            <div className='img'>
                <img src={img} alt="" />
            </div>
        </section>
    </>
  )
}

export default Home