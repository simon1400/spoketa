import React, {useState} from 'react'
import logo from '../../assets/logo.svg'

const Header = () => {

  const [active, setActive] = useState(false)

  return(
    <header>
      <div className="uk-container">
        <div className="uk-grid" uk-grid="">
          <div className="uk-width-2-3 uk-width-1-4@m">
            <div className="logo-wrap">
              <img src={logo} alt="Spoketa" />
            </div>
          </div>
          <div className="uk-width-1-3 uk-width-3-4@m">
            <div className="hamburger-wrap">
              <button className={`hamburger hamburger--spring ${active ? 'is-active' : ''}`} onClick={() => setActive(!active)} type="button">
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
            <nav className={active ? 'open-menu' : ''}>
              <ul>
                <li><a href="/" className="active-mnu">Vnitřní omítky</a></li>
                <li>
                  <a href="/">Venkovní omítky</a>
                  <div className="uk-dropdown uk-dropdown-bottom-center" uk-dropdown="pos: bottom-center">
                    <ul>
                      <li><a href="/">Zateplení fasády</a></li>
                      <li><a href="/">Technologie</a></li>
                      <li><a href="/">O nás</a></li>
                      <li><a href="/">Kontakt</a></li>
                    </ul>
                  </div>
                </li>
                <li><a href="/">Zateplení fasády</a></li>
                <li><a href="/">Technologie</a></li>
                <li><a href="/">O nás</a></li>
                <li><a href="/">Kontakt</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
