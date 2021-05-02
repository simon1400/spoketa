import {useState, useEffect} from 'react'
import sanityClient from "../../lib/sanity.js";
import Link from 'next/link'
import { useRouter } from 'next/router'

const query = `*[_type == "project"] {
  menu,
  slug,
  order
} | order(order asc) [0..8]
`;

const Header = () => {

  const router = useRouter()
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
        <div className="uk-grid uk-grid-collapse uk-grid-stack" uk-grid="">
          <div className="uk-width-2-3 uk-width-1-4@m">
            <div className="logo-wrap">
              <Link href="/"><a><img className="uk-svg" src="/assets/logo.svg" uk-svg="" alt="Spoketa" /></a></Link>
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

            {dataArray.length ? <nav className={active ? 'open-menu' : ''}>
              <ul>
                {dataArray.map((item, index) => <li key={index} className={item.slug.current === router.query.project ? "active-mnu" : ''}>
                  <Link href={`/${item.slug.current}`}>
                    <a>{item.menu}</a>
                  </Link>
                </li>)}
              </ul>
            </nav> : ''}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
