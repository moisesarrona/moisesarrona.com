import React from 'react'

const text = "This web site has many secrets, discover them"

const Note = () => {
  return (
    <>
        <div className="note">
            <p>TIP: [</p>
            <p>{ text }</p>
            <p>]</p>
        </div>
    </>
  )
}

export default Note