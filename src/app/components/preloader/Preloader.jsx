import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { usePreloader } from '../../context/LoadContext';

const Preloader = () => {
  const countRef = useRef(0);
  const loadRef = useRef('');
  const preloadRef = useRef();
  const preloadBackRef = useRef();
  const { markPreloaderFinished } = usePreloader()

  useEffect(() => {
    const timeLine = gsap.timeline({
      defaults: {
        ease: "power2.out",
      }
    });

    /**
     * When load page start preloader
     */
    const handLoad = () => {
      timeLine
        .to(countRef.current, {
          innerText: 100,
          duration: 1.4,
          delay: 0.5,
          snap: {
            innerText: 1
          }
        })
        .to(loadRef.current, {
          width: '100%',
          duration: 1.4
        }, '-=1')
        .to(preloadRef.current, {
          top: '-100%',
          duration: 0.4,
          delay: 0.3
        }).to(preloadBackRef.current, {
          top: '-100%',
          duration: 0.4,
          delay: 0.75,
          onComplete: () => {
            markPreloaderFinished()
          }
        }, "-=1")
    }

    window.addEventListener('load', handLoad());

    return () => {
      window.removeEventListener('load', handLoad());
    }
  }, [])


  return (
    <>
      <div ref={preloadRef} className="preloader">
        <div className="preloader__content">
          <div ref={countRef} className="preloader__counter">0</div>
          <div className="preloader__load">
            <span ref={loadRef} className="preloader__load--color"></span>
          </div>
        </div>
      </div>
      <div ref={preloadBackRef} className="preloader__back"></div>
    </>
  )
}

export default Preloader