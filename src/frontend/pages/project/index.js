import React, { useState } from 'react'
import Page from '../../layout/page'
import Breadcrumb from '../../components/breadcrumb'

import img from '../../assets/img.jpg'
import down from '../../assets/down.svg'
import right from '../../assets/right.svg'

const Project = () => {

  const [state, setState] = useState({
    width: 0,
    height: 0,
    square: 0,
    price: 0
  })


  const handleCalculate = (name, value) => {
    if(+value || value === ''){
      var newState = {...state}
      newState[name] = value
      newState.square = newState.width * newState.height
      newState.price = newState.square * 195
      setState({...newState})
    }
  }

  return(
    <Page title="Project" id="project">
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
                  <Breadcrumb />
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

      <section className="short-project">
        <div className="uk-container">
          <div className="uk-grid" uk-grid="">

            <div className="uk-width-1-1">
              <div className="short-project-head home-short-item">
                <h2>Strojní vnitřní omítky</h2>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
              </div>
            </div>

            <div className="uk-width-1-1">
              <div className="short-project-item home-short-item">
                <div className="uk-grid" uk-grid="">
                  <div className="uk-width-1-1 uk-width-1-4@m">
                    <div className="short-project-img-wrap">
                      <img src={img} alt="Title"/>
                      <a href="/" className="button_link">
                        <img src={right} alt="right" />
                      </a>
                    </div>
                  </div>
                  <div className="uk-width-1-1 uk-width-3-4@m uk-flex uk-flex-center uk-flex-column">
                    <h2>Strojní vnitřní omítky</h2>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="uk-width-1-1">
              <div className="short-project-item home-short-item">
                <div className="uk-grid" uk-grid="">
                  <div className="uk-width-1-1 uk-width-1-4@m">
                    <div className="short-project-img-wrap">
                      <img src={img} alt="Title"/>
                      <a href="/" className="button_link">
                        <img src={right} alt="right" />
                      </a>
                    </div>
                  </div>
                  <div className="uk-width-1-1 uk-width-3-4@m uk-flex uk-flex-center uk-flex-column">
                    <h2>Strojní vnitřní omítky</h2>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="uk-width-1-1">
              <div className="short-project-item home-short-item uk-margin-large-bottom">
                <div className="uk-grid" uk-grid="">
                  <div className="uk-width-1-1 uk-width-1-4@m">
                    <div className="short-project-img-wrap">
                      <img src={img} alt="Title"/>
                      <a href="/" className="button_link">
                        <img src={right} alt="right" />
                      </a>
                    </div>
                  </div>
                  <div className="uk-width-1-1 uk-width-3-4@m uk-flex uk-flex-center uk-flex-column">
                    <h2>Strojní vnitřní omítky</h2>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="right_block">
        <div className="uk-container">
          <div className="uk-grid uk-grid-collapse" uk-grid="">

            <div className="uk-width-1-1 uk-width-2-3@m">
              <div className="top-info-wrap calculator">
                <div className="top-info">
                  <h1>Cena jádrové omítky od 195 Kč/m<sup>2</sup></h1>
                  <h2>Vyzkoušejte kalkulačku jádrové omítky</h2>
                  <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@m" uk-grid="">
                    <div>
                      <div className={`animate-input ${state.width ? 'active-input' : ''}`}>
                        <input type="text" value={state.width !== 0 ? state.width : ''} onChange={e => handleCalculate('width', e.target.value)} />
                        <label>šířka zdi</label>
                      </div>
                      <div className={`animate-input ${state.height ? 'active-input' : ''}`}>
                        <input type="text" value={state.height !== 0 ? state.height : ''} onChange={e => handleCalculate('height', e.target.value)} />
                        <label>výška zdi</label>
                      </div>
                    </div>
                    <div>
                      <div className="info-price">
                        <span>cena za {state.square} m<sup>2</sup></span>
                        <span className="price">{state.price} Kč</span>
                      </div>
                    </div>
                  </div>
                  <p className="describe-calculator">Uvedená cena je bez DPH, je orientační a závislá na použité technologii.</p>
                  <p className="describe-calculator">Naši specialisté Vám na požádání zpracují nezávaznou cenovou nabídku přímo pro Vaši stavbu.</p>
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

export default Project
