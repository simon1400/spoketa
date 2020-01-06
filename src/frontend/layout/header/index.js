import React, {useState, useEffect} from 'react'
import logo from '../../assets/logo.svg'
import sanityClient from "../../../lib/sanity.js";

const query = `*[_type == "project"] {
  menu,
  slug,
  order
} | order(order asc) [0..8]
`;

const Header = () => {

  const [active, setActive] = useState(false)
  const [dataArray, setDataArray] = useState([])

  useEffect(() => {
    sanityClient
      .fetch(query)
      .then(data => setDataArray([...data]))
      .catch(err => console.log(err));
  }, [])

  return(
    <header>
      <div className="uk-container">
        <div className="uk-grid uk-grid-collapse" uk-grid="">
          <div className="uk-width-2-3 uk-width-1-4@m">
            <div className="logo-wrap">
              <a href="/"><img src={logo} alt="Spoketa" /></a>
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
            {/*<div className="uk-dropdown uk-dropdown-bottom-center" uk-dropdown="pos: bottom-center">
              <ul>
                <li><a href="/">Zateplení fasády</a></li>
                <li><a href="/">Technologie</a></li>
                <li><a href="/">O nás</a></li>
                <li><a href="/">Kontakt</a></li>
              </ul>
            </div>*/}
            {dataArray.length ? <nav className={active ? 'open-menu' : ''}>
              <ul>
                {/*<li><a href="/" className="active-mnu">Vnitřní omítky</a></li>*/}
                {dataArray.map((item, index) => <li key={index}><a href={`/${item.slug.current}`}>{item.menu}</a></li>)}
              </ul>
            </nav> : ''}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
