import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faTerminal, faCode, faSoap } from '@fortawesome/free-solid-svg-icons';
import { faFirefox } from '@fortawesome/free-brands-svg-icons'
import gsap from 'gsap';
import { useLoader } from '../../context/LoadContext';

const ProjectFilter = ({
  filterType,
  handleType,
  typeProject }) => {
  const { loaderFinished } = useLoader();
  const inputAnimRef = typeProject.map(() => useRef());
  const timeLine = gsap.timeline();

  /**
   * Start animations with gsap when loaded page
   */
  useEffect(() => {

    /**
     * Letter animation
     */
    const letterAnimation = () => {
      typeProject.forEach((type, index) => {
        if (inputAnimRef[index].current) {
          inputAnimRef[index].current.style.opacity = 0;
          inputAnimRef[index].current.style.marginLeft = '-25px';
    
          if (loaderFinished) {
            timeLine.to(inputAnimRef[index].current, {
              opacity: 1,
              marginLeft: 0,
              duration: 0.25
            })
          }
        }
      });
    }

    letterAnimation();

    return () => {
      gsap.killTweensOf([
        inputAnimRef.current
      ])
    }

  }, [loaderFinished])

  return (
    <>

      <div className='option__content'>
        {
          typeProject.map((type, index) => {
            return (
              <label className='option__label'
                key={index}
                htmlFor={type}
                ref={inputAnimRef[index]}>

                <input className='option__radio'
                  type='radio'
                  name='type'
                  id={type}
                  value={type}
                  checked={filterType === type || (!filterType && type === 'ALL')}
                  onChange={handleType} />

                <div className='option__box box'>
                  <FontAwesomeIcon
                    icon={
                      type.toUpperCase() === 'DESKTOP APP' ? faLaptop :
                      type.toUpperCase() === 'WEB APP' ? faFirefox :
                      type.toUpperCase() === 'LIBRARY' ? faTerminal :
                      type.toUpperCase() === 'MULTI APP' ? faCode : faSoap
                    } />

                    <span>{type}</span>
                </div>
              </label>
            )
          })
        }
      </div>

    </>
  )
}

export default ProjectFilter