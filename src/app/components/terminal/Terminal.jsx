import React, { useState } from 'react'
import { COMMANDS, SECTIONS, TERMINAL_NAME, CONTENTS } from '../../core/data/terminalData'
import TerminalInput from './TerminalInput';
import TerminalHistory from './TerminalHistory';
import TerminalInfo from './TerminalInfo';
import { ITEM_PAGES } from '../../core/data/templateData';
import { useNavigate } from 'react-router-dom';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [activeFolder, setActiveFolder] = useState('home');
  const navigate = useNavigate();

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
      const isWord = COMMANDS.includes(firstWord);
      isWord ? executeCommand(firstWord, secondWord) : msgError(firstWord, 'it is not a command');
    }
  }

  /**
   * Redirect function to excute COMMANDS
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
      SECTIONS
      .forEach((SECTION) => {
        if (SECTION[activeFolder]) {
          const files = SECTION[activeFolder].files;
          const folders = SECTION[activeFolder].folders;
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

    if (isCd && secondWord === '..') {
      let home = 'home'
      setActiveFolder(home)
      let page = getRoute(home);
      if (page)
        navigate(page.link)
      return
    }

    const msg = isCat ? 'it is not a file' : 'it is not a foler'

    SECTIONS.forEach((section) => {
      if (section[activeFolder]) {
        const target = isFile ? section[activeFolder].files : section[activeFolder].folders
        if (target.includes(secondWord)) {
          if (isCat && isFile) {
            openFile(secondWord)

          } else if (isCd && !isFile) {
            let page = getRoute(secondWord);
            if (page)
              navigate(page.link)
            setActiveFolder(secondWord)

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
   * Build error message to COMMANDS
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
    const matchingContent = CONTENTS.find((contentItem) => contentItem[activeFolder]);

    if (matchingContent) {
      const activeContent = matchingContent[activeFolder];
      const content = activeContent.find((item) => item[file.split('.')[0]] !== undefined);

      if (content) {
        const contentValue = content[file.split('.')[0]];
        setHistory((prevHistory) => [...prevHistory, contentValue]);
      } else {
        msgError(file, 'Error in show content');
      }
    } else {
      msgError(file, 'Error in show content');
    }
  }

  /**
   * find and get information from route
   * @param {string} page page to found
   * @returns information from page
   */
  const getRoute = (route) => {
    return ITEM_PAGES.find(pages => pages.link.includes(route))
  }

  return (
    <>
      <div className="terminal glass">
        <TerminalInfo />

        <TerminalHistory
          history={history}
          terminalName={TERMINAL_NAME} />

        <TerminalInput
          terminalName={TERMINAL_NAME}
          input={input}
          setInput={setInput}
          inputSend={inputSend} />
      </div>
    </>
  )
}

export default Terminal