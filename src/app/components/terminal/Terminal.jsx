import React, { useState } from 'react'
import { commands, sections, terminalName } from './terminalData'
import TerminalInput from './TerminalInput';
import TerminalHistory from './TerminalHistory';

const Terminal = () => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [active, setActive] = useState('home')

  const inputSend = (e) => {
    if (e.key == 'Enter') {
      const inputValid = input.trim().replace(/\s{2,}/g, ' ')
      setHistory([...history, '~' + inputValid])
      validateCommand(inputValid)
      setInput('')
    }
  }

  const validateCommand = (input) => {
    if (input !== '') {
      const inputWords = input.split(' ');
      const firstWord = inputWords[0];
      const secondWord = inputWords[1];
      const isWord = commands.includes(firstWord);
      isWord? executeCommand(firstWord, secondWord) : msgError(firstWord, 'it is not a command');
    }
  }

  const executeCommand = (firstWord, secondWord) => {
    switch (firstWord) {
      case 'ls':
        ls(secondWord)
        break;

      case 'cd':
        lsCd(secondWord)
        break;

      case 'cat':
        lsCd(secondWord)
        break;

      case 'clear':
        clear()
        break;
    
      default:
        msgError(firstWord, 'it is not a command')
        break;
    }
  }

  const ls = (secondWord) => {
    if (secondWord === undefined)
      sections.forEach((section, index) => {
        if (section[active]) {    
          const files = section[active].files;
          const folders = section[active].folders;
          const all = [...files, ...folders].join(' ');
          setHistory((prevHistory) => [...prevHistory, all]);
        }
      });
    else 
      msgError(secondWord, 'it is not a attribute')
  }

  const lsCd = (secondWord) => {
    if (secondWord !== undefined) {
      const isFile = secondWord.includes('.txt')
      if (!isFile) {
        let msg = 'it is not a folder'
        if (secondWord !== '...') {
          sections.forEach((section, index) => {
            if (section[active]) {
              const folders = section[active].folders;
              folders.includes(secondWord)? setActive(secondWord) : msgError(secondWord, msg)
            }
          })
        } else {
          setActive('home')
        }
      } else {
        let msg = 'it is not a file'
        sections.forEach((section, index) => {
          if (section[active]) {
            const files = section[active].files;
            files.includes(secondWord)? console.log('hiiiii') : msgError(secondWord, msg)
          }
        })
      }
    } else  {
      msgError(secondWord, 'it is not a attribute')
    }
  }

  const clear = () => {
    setHistory([]);
    setInput('');
  }

  const msgError = (word, msg) => {
    setHistory((prevHistory) => [...prevHistory, `${word} ${msg}`]);
  }
  
  return (
    <>
        <div className="terminal">
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