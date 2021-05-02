import { useState, useEffect } from 'react'

import sanityClient from "../../lib/sanity.js";

const query = `*[_type == "global"] {
  footerHead,
  phone,
  email,
  address,
}[0...1]
`;

const Footer = () => {

  const [dataArray, setDataArray] = useState([])

  useEffect(() => {
    sanityClient
      .fetch(query)
      .then(data => setDataArray([...data]))
      .catch(err => console.log(err));
  }, [])

  var data = dataArray[0]

  return dataArray.length ?
    <footer>
      <div className="uk-container">
        <div className="upper-footer">
          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@s uk-grid-small" uk-grid="">
            <div>
              <div className="wrap-footer-head">
                <h2>{data.footerHead}</h2>
              </div>
            </div>
            <div>
              <div className="footer-button-wrap">
                <a href={`tel:${data.phone.split(' ').join('')}`} className="button-green"><img className="uk-svg" src="/assets/phone.svg" uk-svg="" alt="Icon phone"/>{data.phone}</a>
                <a href={`mailto:${data.email}`} className="button-green"><img className="uk-svg" src="/assets/letter.svg" uk-svg="" alt="Icon letter"/>{data.email}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright-wrap">
          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="">
            <div>
              <p>{data.address}</p>
            </div>
            <div>
              <div className="author">
                <span>Made in Brno by</span>
                <a href="mailto:danielkokes@gmail.com?subject=Dotaz ze stranky spoketa.cz">
                  <img src="/assets/hardart.svg" alt="Hardart"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer> : ''
}


export default Footer
