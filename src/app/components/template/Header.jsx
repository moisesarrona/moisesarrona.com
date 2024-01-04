import React from 'react'
import { NavLink } from 'react-router-dom'
import { ITEM_PAGES } from '../../core/data/templateData'

const Header = () => {
  return (
    <>
      <header>
        <div className="header__content">
          {
            ITEM_PAGES
              .filter(pages => pages.active == true)
              .map((pages, index) => {
                return (
                  <NavLink key={index} to={pages.link}
                    className={`header__item ${({ isActive }) => { return isActive ? "active" : '' }}`}>
                    {pages.name}
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