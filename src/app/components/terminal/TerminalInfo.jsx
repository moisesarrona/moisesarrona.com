import gsap from 'gsap';
import { TextPlugin } from 'gsap/all';
import React, { useState, useEffect, useRef } from 'react';
import { useLoader } from '../../context/LoadContext';

gsap.registerPlugin(TextPlugin);

const TerminalInfo = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  const browserName = navigator.userAgent;
  const osName = navigator.platform;
  const { loaderFinished } = useLoader();
  const timeLine = gsap.timeline();
  const dateAnimRef = useRef();
  const timeAnimRef = useRef();
  const browserAnimRef = useRef();
  const osAnimRef = useRef();
  const bannerAnimRef = useRef();

  const banner = `
   ______ ______   _______  ___     
  |\\   _ \\  _   \\|\\   __  \\|\\  \\    
  \\ \\  \\\\\\__\\ \\  \\ \\  \\|\\  \\ \\  \\   
   \\ \\  \\\\|__| \\  \\ \\  \\\\\\  \\ \\  \\  
    \\ \\  \\    \\ \\  \\ \\  \\\\\\  \\ \\  \\ 
     \\ \\__\\    \\ \\__\\ \\_______\\ \\__\\
      \\|__|     \\|__|\\|_______|\\|__|
                                    
  `;

  const [formattedTime, setFormattedTime] = useState(
    currentDate.toLocaleTimeString()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = new Date();
      const newFormattedTime = newDate.toLocaleTimeString();
      setFormattedTime(newFormattedTime);
    }, 1000)
    return () => clearInterval(intervalId);
  }, []);

  /**
   * Start animations with gsap when loaded page
   */
  useEffect(() => {

    /**
     * Write text in terminal
     */
    const terminalAnimation = () => {
      if (dateAnimRef.current
        && timeAnimRef.current
        && browserAnimRef.current
        && osAnimRef.current) {
        bannerAnimRef.current.style.height = '20px';
        bannerAnimRef.current.style.overflow = 'hidden'

        if (loaderFinished) {
          timeLine.to(dateAnimRef.current, {
            text: formattedDate,
            duration: 0.5,
            ease: 'power1.in'
          })
            .to(timeAnimRef.current, {
              text: formattedTime,
              duration: 0.5,
              ease: 'power1.in'
            })
            .to(browserAnimRef.current, {
              text: browserName,
              duration: 2,
              ease: 'power1.in'
            })
            .to(osAnimRef.current, {
              text: osName,
              duration: 0.5,
              ease: 'power1.in'
            })
            .to(bannerAnimRef.current, {
              height: 'auto',
              duration: 0.5,
              ease: 'power1.in'
            })
        }
      }
    }

    terminalAnimation();

  }, [loaderFinished])


  return (
    <div className='terminal__content'>
      <div></div>
      <div>
        <p><span className='terminal__color'>Date:</span> <span ref={dateAnimRef}></span></p>
        <p><span className='terminal__color'>Hour:</span> <span ref={timeAnimRef}></span></p>
        <p><span className='terminal__color'>Browser:</span> <span ref={browserAnimRef}></span></p>
        <p><span className='terminal__color'>OS:</span> <span ref={osAnimRef}></span></p>
        <pre className='terminal__color' id='heey' ref={bannerAnimRef}>{banner}</pre>
      </div>
    </div>
  );
};

export default TerminalInfo;
