import React, { useEffect } from 'react'
import { useRoute } from '../../context/RouteContext'

const ScrollToTop = () => {
  const currentPath = useRoute()

  /**
   * Scroll top
   */
  useEffect(() => {
    window.scrollTo(0,0)
  }, [currentPath])
  

  return null
}

export default ScrollToTop