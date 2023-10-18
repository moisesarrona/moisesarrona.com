import React, { useState } from 'react'

const HomeLetters = ({activeClass, letter}) => {
  const [hasClass, setHasClass] = useState(activeClass)
  
  /**
   * Add class when click in span
   * @returns hasClass
   */
  const handleClick = () => {
    return setHasClass(!hasClass)
  }

  return (
    <span className={`spetial__letter ${hasClass? 'neon__flicker' :''}`}
      onClick={handleClick}>{letter}</span>
  )
}

export default HomeLetters