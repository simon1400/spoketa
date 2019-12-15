import React from 'react'
import Page from '../../layout/page'

import img from '../../assets/img.jpg'
import down from '../../assets/down.svg'
import right from '../../assets/right.svg'


const Homepage = () => {
  return (
    <Page title="Uvod" id="homepage">
      <section className="sec-head">
        <div className="uk-container">
          <div className="uk-grid uk-grid-collapse" uk-grid="">
            <div className="uk-width-1-1 uk-width-1-3@m">
              <div className="img-top-wrap">
                <div className="img-top">
                  <img src={img} alt="Description top" />
                </div>
              </div>
            </div>
            <div className="uk-width-1-1 uk-width-2-3@m">
              <div className="top-info-wrap">
                <div className="top-info">
                  <span>SPOKETA s.r.o.</span>
                  <h1>Spolehlivý a precizní partner pro dokončení omítek a fasád</h1>
                  <button className="button_arrow button_green">
                    <img src={down} alt="Arrow down" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-short">
        <div className="uk-container">
          <div className="uk-flex uk-flex-around uk-flex-wrap">
            <div className="home-short-item">
              <h2>Strojní vnitřní omítky</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
              <a href="/" className="button_bare">Více informací <img src={right} alt="Arrow right" /></a>
            </div>
            <div className="home-short-item">
              <h2>Strojní vnitřní omítky</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
              <a href="/" className="button_bare">Více informací <img src={right} alt="Arrow right" /></a>
            </div>
            <div className="home-short-item">
              <h2>Strojní vnitřní omítky</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
              <a href="/" className="button_bare">Více informací <img src={right} alt="Arrow right" /></a>
            </div>
            <div className="home-short-item">
              <h2>Strojní vnitřní omítky</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
              <a href="/" className="button_bare">Více informací <img src={right} alt="Arrow right" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="right_block">
        <div className="uk-container">
          <div className="uk-grid uk-grid-collapse" uk-grid="">

            <div className="uk-width-1-1 uk-width-2-3@m">
              <div className="top-info-wrap">
                <div className="top-info">
                  <span>Garance kvality</span>
                  <h1>Profesionální <br />služby <br /> a osobní přístup, to jsou</h1>
                  <button className="button_blue">Více o nás <img src={right} alt="Arrow right" /></button>
                </div>
              </div>
            </div>

            <div className="uk-width-1-1 uk-width-1-3@m">
              <div className="img-top-wrap">
                <div className="img-top">
                  <img src={img} alt="Description top" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="reference-info">
        <div className="uk-container">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div>
              <h2>Poslední reference</h2>
              <p>Lorem ipsum dolor sit amet, <a href="/">consectetuer adipiscing elit</a>, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="galery">
        <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1" uk-slider="">

          <ul className="uk-slider-items uk-child-width-1-3 uk-child-width-1-6@m uk-grid">
            <li>
              <div className="uk-panel">
                <div className="galery-wrap-img">
                  <img src={img} alt="" />
                </div>
              </div>
            </li>
            <li>
              <div className="uk-panel">
                <div className="galery-wrap-img">
                  <img src={img} alt="" />
                </div>
              </div>
            </li>
            <li>
              <div className="uk-panel">
                <div className="galery-wrap-img">
                  <img src={img} alt="" />
                </div>
              </div>
            </li>
            <li>
              <div className="uk-panel">
                <div className="galery-wrap-img">
                  <img src={img} alt="" />
                </div>
              </div>
            </li>
            <li>
              <div className="uk-panel">
                <div className="galery-wrap-img">
                  <img src={img} alt="" />
                </div>
              </div>
            </li>
            <li>
              <div className="uk-panel">
                <div className="galery-wrap-img">
                  <img src={img} alt="" />
                </div>
              </div>
            </li>
            <li>
              <div className="uk-panel">
                <div className="galery-wrap-img">
                  <img src={img} alt="" />
                </div>
              </div>
            </li>
            <li>
              <div className="uk-panel">
                <div className="galery-wrap-img">
                  <img src={img} alt="" />
                </div>
              </div>
            </li>
            <li>
              <div className="uk-panel">
                <div className="galery-wrap-img">
                  <img src={img} alt="" />
                </div>
              </div>
            </li>
            <li>
              <div className="uk-panel">
                <div className="galery-wrap-img">
                  <img src={img} alt="" />
                </div>
              </div>
            </li>
          </ul>

          <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous="" uk-slider-item="previous"></a>
          <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next="" uk-slider-item="next"></a>

        </div>
      </section>
    </Page>
  )
}

export default Homepage
