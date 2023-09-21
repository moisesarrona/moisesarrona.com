import React from 'react'

const TerminalInput = ({
    terminalName, 
    input,
    setInput,
    inputSend,}) => {
  return (
    <>
        <div className="terminal__input">
            <div className='terminalName'> { terminalName } </div>
            <div> 
                <input type="text" 
                autoFocus
                value={ input }
                onChange={ (e) => setInput(e.target.value) }
                onKeyDown={ inputSend }/>
            </div>
        </div> 
    </>
  )
}