import React, { useState } from 'react'
import { commands, sections, terminalName, contents } from './terminalData'
import TerminalInput from './TerminalInput';
import TerminalHistory from './TerminalHistory';
import TerminalInfo from './TerminalInfo'

const Terminal = () => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [active, setActive] = useState('home')

  /**
   * Get input event
   * @param {Object} e - Input event
   */
  const inputSend = (e) => {
    if (e.key == 'Enter') {
      const inputValid = input.trim().replace(/\s{2,}/g, ' ')
      setHistory([...history, '~' + inputValid])
      validateCommand(inputValid)
      setInput('')
    }
  }

  /**
   * Valid if input contain command
   * @param {string} input - Input content
   */
  const validateCommand = (input) => {
    if (input !== '') {
      const inputWords = input.split(' ');
      const firstWord = inputWords[0];
      const secondWord = inputWords[1];
      const isWord = commands.includes(firstWord);
      isWord? executeCommand(firstWord, secondWord) : msgError(firstWord, 'it is not a command');
    }
  }

  /**
   * Redirect function to excute commands
   * @param {string} firstWord Input commanddd
   * @param {string} secondWord Input param
   */
  const executeCommand = (firstWord, secondWord) => {
    switch (firstWord) {
      case 'ls':
        ls(secondWord)
        break;

      case 'cd':
        catCd(firstWord, secondWord)
        break;

      case 'cat':
        catCd(firstWord, secondWord)
        break;

      case 'clear':
        clear()
        break;
    
      default:
        msgError(firstWord, 'it is not a command')
        break;
    }
  }

  /**
   * function to ls command
   * @param {string} secondWord - Navigate
   */
  const ls = (secondWord) => {
    if (secondWord === undefined)
      sections.forEach((section) => {
        if (section[active]) {    
          const files = section[active].files;
          const folders = section[active].folders;
          const all = [...files, ...folders];
          setHistory((prevHistory) => [...prevHistory, all]);
        }
      });
    else 
      msgError(secondWord, 'it is not a attribute')
  }

  /**
   * function to cat and cd command
   * @param {string} secondWord - Folder or File
   */
  const catCd = (firstWord, secondWord) => {

    if (secondWord === undefined) {
      msgError(secondWord, 'it is not a attribute')
      return
    }

    const isCd = firstWord === 'cd'
    const isCat = firstWord === 'cat'
    const isFile = secondWord.includes('.txt')

    if (isCd && secondWord === '...') {
      setActive('home')
      return
    }

    const msg = isCat? 'it is not a file' : 'it is not a foler'

    sections.forEach((section) => {
      if (section[active]) {
        const target = isFile? section[active].files : section[active].folders
        if (target.includes(secondWord)) {
          if (isCat && isFile) {
            openFile(secondWord)

          } else if (isCd && !isFile) {
            setActive(secondWord)

          } else {
            msgError(secondWord, msg)

          }
        } else {
          msgError(secondWord, msg)
        }
      }
    })
  }

  /**
   * Clear history and input
   */
  const clear = () => {
    setHistory([]);
    setInput('');
  }

  /**
   * Build error message to commands
   * @param {string} word 
   * @param {string} msg 
   */
  const msgError = (word, msg) => {
    setHistory((prevHistory) => [...prevHistory, `${word} ${msg}`]);
  }

  /**
   * open content file
   * @param {string} file 
   */
  const openFile = (file) => {
    const matchingContent = contents.find((contentItem) => contentItem[active]
    .some(item => item[file.split('.')[0]] !== undefined));
    const content = matchingContent[active].find(item => item[file.split('.')[0]] !== undefined);
    matchingContent? setHistory((prevHistory) => [...prevHistory, content[file.split('.')[0]]]) : msgError(file, 'Error in show content')
  }
  
  return (
    
    <>
        <div className="terminal">
            <TerminalInfo />
            
            <TerminalHistory 
              history={ history } 
              terminalName={ terminalName } />

            <TerminalInput
              terminalName={terminalName }
              input={ input}
              setInput={ setInput }
              inputSend={ inputSend } />
        </div>
    </>
  )
}

export default Terminal