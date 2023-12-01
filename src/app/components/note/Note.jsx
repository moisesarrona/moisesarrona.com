import React, { useEffect, useRef, useState } from 'react';
import { TIPS } from '../../core/data/noteData';
import { useRoutePath } from '../../context/RoutePathContext';
import gsap from 'gsap';
import { useLoader } from '../../context/LoadContext';


const Note = () => {
  const [tip, setTip] = useState('');
  const [tipIndex, setTipIndex] = useState(0)
  const currentPath = useRoutePath();
  const tipValue = TIPS[0][currentPath];
  const { loaderFinished } = useLoader();
  const contentAnimRef = useRef();
  const timeLine = gsap.timeline();

  /**
   * Change text to page.
   */
  useEffect(() => {
    if (tipValue) {
      selectText()

      const interval = setInterval(() => {
        changeIndex()
      }, 10000);

      return () => clearInterval(interval)
    } else {
      setTip('Ups! resource not found')
    }
  }, [currentPath, tipIndex])

  /**
   * Start animations with gsap when loaded page
   */
  useEffect(() => {
    
    /**
     * Container animation
     */
    const contentAnimation = () => {
      if(contentAnimRef.current) {
        contentAnimRef.current.style.opacity = 0;
        contentAnimRef.current.style.top = '150px';
        if (loaderFinished) {
          timeLine.to(contentAnimRef.current, {
            opacity: 1,
            top: '120px',
            duration: 0.8
          })
        }
      }
    }

    contentAnimation();
  
  }, [loaderFinished])
  

  /**
   * Select text to show
   */
  const selectText = () => {
    const texts = TIPS[0][currentPath]
    texts.length > 0 ? setTip(texts[tipIndex]) : setTip('Tips not found, bug!!')
  }

  /**
   * Change index to chnage text
   */
  const changeIndex = () => {
    setTipIndex(prevIndex => (prevIndex + 1) % tipValue.length);
  }

  return (
    <>
      <div className="note glass" ref={contentAnimRef}>
        <div className='note__header'>console.log(</div>
        <div className='note__body'>
          <span className='note__start'>"</span> {tip} <span className='note__start'>"</span>
        </div>
        <div className='note__footer'>
          );
        </div>
      </div>
    </>
  )
}

export default Note