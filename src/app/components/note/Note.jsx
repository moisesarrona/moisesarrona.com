import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { TIPS } from '../../core/data/noteData'

const Note = () => {
  const [tip, setTip] = useState('')
  const [tipIndex, setTipIndex] = useState(0)
  const path = useLocation().pathname.replace('/', '')
  const tipValue = TIPS[0][path];

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
  }, [path, tipIndex])

  /**
   * Select text to show
   */
  const selectText = () => {
    const texts = TIPS[0][path]
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
      <div className="note glass">
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