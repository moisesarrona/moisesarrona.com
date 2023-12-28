import React from 'react'

const TerminalInput = ({
  terminalName,
  input,
  setInput,
  inputSend, }) => {
  return (
    <>
      <div className="terminal__content">
        <label htmlFor='terminal' className='terminal__name'> {terminalName} </label>
        <div>
          <input type="text"
            id='terminal'
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={inputSend} />
        </div>
      </div>
    </>
  )
}

export default TerminalInput