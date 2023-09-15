import React from 'react'
import { NavLink } from 'react-router-dom'

const itemPage = [
  {
    name: "home",
    link: "/",
    active: true
  },
  {
    name: "about",
    link: "/about",
    active: true
  },
  {
    name: "contact",
    link: "/contact",
    active: false
  }
]

const Header = () => {
  return (
    <>
        <header>
            <div className="header__content">
                {
                  itemPage
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