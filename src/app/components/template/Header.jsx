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
                      <div className="header__item" key={index}>
                          <NavLink to={item.link}>
                              { item.name }
                          </NavLink>
                      </div>
                    )
                  })
                }
            </div>
        </header>
    </>
  )
}

export default Header