import React from 'react'

import hardart from '../../assets/hardart.svg'
import phone from '../../assets/phone.svg'
import letter from '../../assets/letter.svg'

const Footer = () => {
  return(
    <footer>
      <div className="uk-container">
        <div className="upper-footer">
          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@s uk-grid-small" uk-grid="">
            <div>
              <h2>Ozvěte se ,nám. <br />Rádi vám připravíme nezávaznou <br />cenovou nabídku.</h2>
            </div>
            <div>
              <div className="footer-button-wrap">
                <a href="/" className="button-green"><img src={phone} alt="Icon phone"/> +420 608 843 441</a>
                <a href="/" className="button-green"><img src={letter} alt="Icon letter"/> info@spoketa.cz</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright-wrap">
          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="">
            <div>
              <p>SPOKETA s.r.o., Rašínova 103/2, 602 00, Brno</p>
            </div>
            <div>
              <div className="author">
                <span>Made in Brno by</span>
                <img src={hardart} alt="Hardart"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default Footer
