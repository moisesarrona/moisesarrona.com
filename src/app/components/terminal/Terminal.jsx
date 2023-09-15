import React from 'react'

const Terminal = () => {
  const terminalName = "arrona@portfolio $";
  
  return (
    <>
        <div className="terminal">
            <div className="terminal__history">
                <div> { terminalName } </div>
                <div> ls </div>
            </div>

            <div className="terminal__input">
                <div> { terminalName } </div>
                <div> 
                  <input type="text" />
                </div>
            </div>
        </div>
    </>
  )
}

export default Terminal