import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useLoader } from '../../context/LoadContext';

const Preloader = () => {
  const countRef = useRef(0);
  const loadRef = useRef('');
  const loadWrap = useRef();
  const loadWrapBack = useRef();
  const loadContent = useRef();
  const { markLoaderFinished } = useLoader();

  /**
   * Start animations with gsap when loaded page
   */
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
    if (
      countRef.current &&
      loadRef.current &&
      loadWrap.current &&
      loadWrapBack.current &&
      loadContent.current
    ) {
      timeLine
        .to(countRef.current, {
          innerText: 100,
          duration: 1.2,
          delay: 0.5,
          snap: {
            innerText: 1
          }
        })
        .to(loadRef.current, {
          width: '100%',
          duration: 1.2
        }, '-=1')
        .to(loadContent.current, {
          marginTop: '30px',
          opacity: 0,
          duration: 0.4
        }, '>')
        .to(loadWrap.current, {
          top: '-100%',
          duration: 0.4,
          delay: 0.3
        }, '<')
        .to(loadWrapBack.current, {
          top: '-100%',
          duration: 0.4,
          delay: 0.75,
          onComplete: () => {
            markLoaderFinished()
          }
        }, "-=1");
    }
  }

    window.addEventListener('load', handLoad());

    return () => {
      window.removeEventListener('load', handLoad());
      gsap.killTweensOf([
        countRef.current,
        loadRef.current,
        loadWrap.current,
        loadWrapBack.current,
        loadContent.current
      ])
    }
  }, [])


  return (
    <>
      <div ref={loadWrap} className="preloader">
        <div className="preloader__content" ref={loadContent}>
          <div ref={countRef} className="preloader__counter">0</div>
          <div className="preloader__load">
            <span ref={loadRef} className="preloader__load--color"></span>
          </div>
        </div>
      </div>
      <div ref={loadWrapBack} className="preloader__back"></div>
    </>
  )
}

export default Preloader