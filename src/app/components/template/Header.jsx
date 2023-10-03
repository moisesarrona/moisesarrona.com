import React from 'react'
import { NavLink } from 'react-router-dom'
import { ITEM_PAGES } from './templateData'

const Header = () => {
  return (
    <>
      <header>
        <div className="header__content">
          {
            ITEM_PAGES
              .filter(item => item.active == true)
              .map((item, index) => {
                return (
                  <NavLink key={index} to={item.link} 
                    className={`header__item ${({isActive}) => { return isActive? "active" : '' }}`}>
                      {item.name}
                  </NavLink>
                )
              })
          }
        </div>
      </header>
    </>
  )
}

export default Header