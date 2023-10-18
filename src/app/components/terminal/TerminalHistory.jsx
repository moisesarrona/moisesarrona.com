import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFolder } from '@fortawesome/free-regular-svg-icons';

const TerminalHistory = ({ history, terminalName }) => {

  /**
   * Valid if item is an array
   * @param {string} item - item of history
   * @returns - boolean
   */
  const validArray = (item) => {
    let isArray = Array.isArray(item);
    return isArray ? true : false
  }

  /**
   * Valid if item is a command
   * @param {string} item - item of history
   * @returns boolean
   */
  const validCommand = (item) => {
    if (validArray(item))
      return false
    if (item.includes('~'))
      return true
    else
      return false
  }

  return (
    <>
      {
        history.map((item, index) => {

          const isArray = validArray(item)
          const isCommand = validCommand(item)

          return (
            <div className="terminal__content" key={index}>
              <div className={isCommand ? 'terminal__name' : 'terminal__name--none'}>
                {terminalName}
              </div>
              {
                !isArray ?
                  (<div>{item.replace('~', '')}</div>) :
                  (
                    <ul className='terminal__list'>
                      {
                        item.map((content, contentIndex) => (
                          <li key={contentIndex}>
                            <FontAwesomeIcon
                              icon={content.includes(".txt") ? faFile : faFolder}
                              className='icon' /> {content} {!content.includes(".txt") ? '/' : ''}
                          </li>
                        ))
                      }
                    </ul>
                  )
              }
            </div>
          )
        })
      }
    </>
  )
}

export default TerminalHistory