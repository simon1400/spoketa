import React, { useState, useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import Page from '../../layout/page'
import Breadcrumb from '../../components/breadcrumb'

import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import BlockContent from "@sanity/block-content-to-react";
import sanityClient from "../../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";

import down from '../../assets/down.svg'
import right from '../../assets/right.svg'

const imageBuilder = imageUrlBuilder(sanityClient);

const urlFor = source => imageBuilder.image(source);

const query = `*[_type == "project" && slug.current == $url] {
  image,
  menu,
  title,
  insideTitle,
  content,
  components,
  colorSection,
  galery,
  titleHead,
  description
}[0...1]
`;

const Project = ({match}) => {

  const [state, setState] = useState({
    width: 0,
    height: 0,
    square: 0,
    price: 0
  })

  const [dataArray, setDataArray] = useState([])

  useEffect(() => {
    sanityClient
      .fetch(query, { url: match.params.project })
      .then(data => setDataArray([...data]))
      .catch(err => console.log(err));
  }, [])

  var data = dataArray[0]

  const handleCalculate = (name, value) => {
    if(+value || value === ''){
      var newState = {...state}
      newState[name] = value
      newState.square = newState.width * newState.height
      newState.price = newState.square * data.colorSection.price
      setState({...newState})
    }
  }

  return dataArray.length ?
    <Page title={data.titleHead} description={data.description} id="project">
      <section className="sec-head">
        <div className="uk-container">
          <div className="uk-grid uk-grid-collapse" uk-grid="">
            <div className="uk-width-1-1 uk-width-1-3@m">
              <div className="img-top-wrap">
                <div className="img-top">
                  <img src={urlFor(data.image).url()} alt={data.title} />
                </div>
              </div>
            </div>
            <div className="uk-width-1-1 uk-width-2-3@m">
              <div className="top-info-wrap">
                <div className="top-info">
                  <Breadcrumb project={{link: match.params.project, title: data.menu }}/>
                  <h1>{data.title}</h1>
                  <Link className="button_arrow button_green" to="section1" spy={true} smooth={true} duration={1000}>
                    <img src={down} alt="Arrow down" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="section1" className="short-project">
        <div className="uk-container">
          <div className="uk-grid" uk-grid="">

            <div className="uk-width-1-1">
              <div className="short-project-head home-short-item">
                <h2>{data.insideTitle}</h2>
                <BlockContent blocks={data.content} />
              </div>
            </div>

            {data.components.map((item, index) =>
              <div key={item._key} className={`uk-width-1-1${(index + 1) === data.components.length ? ' uk-margin-large-bottom' : ''}`}>
                <div className="short-project-item home-short-item">
                  <div className="uk-grid" uk-grid="">
                    <div className="uk-width-1-1 uk-width-1-4@m">
                      <div className="short-project-img-wrap">
                        <img src={urlFor(item.image).url()} alt={item.title}/>
                        <a href={item.link} className="button_link">
                          <img src={right} alt="right" />
                        </a>
                      </div>
                    </div>
                    <div className="uk-width-1-1 uk-width-3-4@m uk-flex uk-flex-center uk-flex-column">
                      <h2>{item.title}</h2>
                      <BlockContent blocks={item.content} />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <section className="right_block">
        <div className="uk-container">
          <div className="uk-grid uk-grid-collapse" uk-grid="">

            <div className="uk-width-1-1 uk-width-2-3@m">
              <div className="top-info-wrap calculator">
                <div className="top-info">
                  <h1>{data.colorSection.title}</h1>
                  <h2>{data.colorSection.content}</h2>
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
                  <img src={urlFor(data.colorSection.image).url()} alt={data.colorSection.title} />
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
              <h2>{data.galery.title}</h2>
              <BlockContent blocks={data.galery.content} />
            </div>
          </div>
        </div>
      </section>

      <section className="galery">
        <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1" uk-slider="">

          <ul className="uk-slider-items uk-child-width-1-3 uk-child-width-1-6@m uk-grid">
            {data.galery.images.map((item, index) =>
              <li key={index}>
                <div className="uk-panel">
                  <div className="galery-wrap-img">
                    <img src={urlFor(item).url()} alt="" />
                  </div>
                </div>
              </li>
            )}
          </ul>

          <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous="" uk-slider-item="previous"></a>
          <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next="" uk-slider-item="next"></a>

        </div>
      </section>
    </Page> : ''
}

export default withRouter(Project)
