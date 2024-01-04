import React, { useEffect } from 'react'
import { useRoutePath } from '../../context/RoutePathContext'

const ScrollToTop = () => {
  const currentPath = useRoutePath()

  /**
   * Scroll top
   */
  useEffect(() => {
    window.scrollTo(0,0)
  }, [currentPath])
  

  return null
}

export default ScrollToTop