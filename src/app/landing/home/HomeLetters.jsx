import React, { useEffect, useRef, useState } from 'react';
import { useLoader } from '../../context/LoadContext';
import { gsap } from 'gsap';

const HomeLetters = ({activeClass, letter, index}) => {
  const [hasClass, setHasClass] = useState(false);
  const { loaderFinished } = useLoader();
  const letterAnimRef = useRef();
  const timeLine = gsap.timeline();
  
  /**
   * Add class when click in span
   * @returns hasClass
   */
  const handleClick = () => {
    return setHasClass(!hasClass)
  }

  /**
   * Start animations with gsap when loaded page
   */
  useEffect(() => {

    /**
     * Letter animation
     */
    const letterAnimation = () => {
      if (letterAnimRef.current) {
        letterAnimRef.current.style.opacity = 0;
        letterAnimRef.current.style.top = '50px';
  
        if (loaderFinished) {
          timeLine.to(letterAnimRef.current, {
            opacity: 1,
            top: 0,
            delay: index * 0.10,
            onComplete: () => {
              setHasClass(activeClass)
            }
          })
        }
      }
    }

    letterAnimation();

    return () => {
      gsap.killTweensOf([
        letterAnimRef.current
      ])
    }

  }, [loaderFinished])

  return (
    <span ref={letterAnimRef} className={`spetial__letter ${hasClass? 'neon__flicker' :''}`}
      onClick={handleClick}>{letter}</span>
  )
}

export default HomeLetters