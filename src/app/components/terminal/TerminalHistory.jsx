import React from 'react'
import { commands } from './terminalData'

const TerminalHistory = ({ history, terminalName }) => {

  const isCommand = (item) => {
    const isWord = item.includes('~');
    return isWord;
  }

  return (
    <>
        {
            history.map((item, index) => {
            const command = isCommand(item);

            return (
                <div className="terminal__history" key={ index }>
                    <div className={ command? 'terminalName' : '' }>{ command? terminalName : '' }</div>
                    <div>{ item.replace('~', '') }</div>
                </div>
            )
            })
        }
    </>
  )
}

export default TerminalHistory