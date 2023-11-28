import React, { useEffect } from 'react'
import useAvatar from './useAvatar'
import { gsap } from 'gsap'
import { useRoutePath } from '../../context/RoutePathContext';
import { ANIMATIONS } from '../../core/data/avatarData'

const Avatar = () => {
  const currentPath = useRoutePath();
  const { canvasRef, modelRef, cameraRef, animationPlay } = useAvatar();

  const timeLine = gsap.timeline({
    defaults:{
      duration: 1,
      ease: 'power4.inOut'
    }
  })

  /**
   * Move camera when change path
   */
  useEffect(() => {
    /**
     * Change position model and position camera add animation gsap
     * @param {number} mX position model in x
     * @param {number} mY position model in y
     * @param {number} mZ position model in z
     * @param {number} cX position camera in x
     * @param {number} cY position camera in y
     * @param {number} cZ position camera in z
     */
    const moveCamera = (mX, mY, mZ, cX, cY, cZ) => {
      timeLine
      .to(modelRef.current.position, {
        x: mX,
        y: mY,
        z: mZ
      })
      .to(cameraRef.current.position, {
        x: cX,
        y: cY,
        z: cZ,
        onUpdate: () => {
          cameraRef.current.updateProjectionMatrix();
        }
      }, '-=1')
    }
    
    /**
     * get current path to change position model and camera
     */
    const moveCameraByPath = () => {
      if (cameraRef.current && modelRef.current) {
        if (currentPath === 'home') {
          moveCamera(0, -8, 0, 0, 0, 10)
        }

        if(currentPath === 'about') {
          moveCamera(-2, -8, -6, -10, 0, 5)
        }

        if(currentPath === 'projects') {
          moveCamera(2, -8, -6, 10, 0, 5)
        }
      }
    }    

    moveCameraByPath();
  
    return () => {
      
    }
  }, [currentPath])

  return (
    <>
      <div ref={canvasRef}
      className='canvas__avatar'
      onClick={() => animationPlay(ANIMATIONS.SAY_NO, true)}
      ></div>
    </>
  )
}

export default Avatar