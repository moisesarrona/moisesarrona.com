import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
    <div className='content__error'>
      <h1 className='error__title'>
        <span>4</span>
        <span>0</span>
        <span className='error__letter__none'>4</span>
        <span className='error__letter__fail'>4</span>
      </h1>
      <span className='error__subtitle'>Page not found, <NavLink to="/home" className='link--spetial'>Go to back!!</NavLink></span>
    </div>
  )
}

export default Error