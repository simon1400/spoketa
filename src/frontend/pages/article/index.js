import React, { useState, useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import Page from '../../layout/page'
import Breadcrumb from '../../components/breadcrumb'

import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import BlockContent from "@sanity/block-content-to-react";
import sanityClient from "../../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";

import img from '../../assets/img.jpg'
import down from '../../assets/down.svg'
import right from '../../assets/right.svg'
import pen from '../../assets/pen.svg'

const imageBuilder = imageUrlBuilder(sanityClient);

const urlFor = source => imageBuilder.image(source);

const query = `*[_type == "product" && slug.current == $url] {
  image,
  title,
  insideTitle,
  content,
  components,
  colorSection,
  galery,
  "links": components[].link._ref,
  titleHead,
  description,
  "projectMenu": *[_type == "project" && slug.current == $project]{ menu }[0...1]
}[0...1]
`;

const newQuery = `*[_type == "product" && _id match $id] {
  _id,
  slug
}[0...100]`

const Article = ({match}) => {

  const [state, setState] = useState({
    width: 0,
    height: 0,
    square: 0,
    price: 0
  })

  const [dataArray, setDataArray] = useState([])
  const [links, setLinks] = useState([])

  useEffect(() => {
    sanityClient
      .fetch(query, { url: match.params.article, project: match.params.project })
      .then(data => setDataArray([...data]))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    if(dataArray.length){
      sanityClient
        .fetch(newQuery, { id: JSON.stringify(dataArray[0].links)})
        .then(data => setLinks([...data]))
        .catch(err => console.log(err));
    }
  }, [dataArray.length])

  var data = dataArray[0]

  const handleCalculate = (name, value) => {
    if((+value || value === '') && +value <= 1000){
      var newState = {...state}
      if(+value){
        newState[name] = Math.floor(value)
      }else if(value === ''){
        newState[name] = 0
      }
      newState.square = newState.width * newState.height
      newState.price = newState.square * data.colorSection.price
      setState({...newState})
    }
  }


  return dataArray.length ?
    <Page title={data.titleHead} id={data.description}>
      <section className="sec-head">
        <div className="uk-container">
          <div className="uk-grid uk-grid-collapse" uk-grid="">
            <div className="uk-width-1-1 uk-width-1-3@m">
              {data.image && <div className="img-top-wrap">
                <div className="img-top">
                  <img src={urlFor(data.image).url()} alt={data.title} />
                </div>
              </div>}
            </div>
            <div className="uk-width-1-1 uk-width-2-3@m">
              <div className="top-info-wrap">
                <div className="top-info">
                  {data.title && <Breadcrumb project={{link: match.params.project, title: data.projectMenu[0].menu }} article={data.title}/>}
                  {data.title && <h1>{data.title}</h1>}
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
                {data.insideTitle && <h2>{data.insideTitle}</h2>}
                {data.content && <BlockContent blocks={data.content} />}
              </div>
            </div>

            {data.components && data.components.length && data.components.map((item, index) => {
              var link_current = item.link ? links.filter(itemLink => itemLink._id === item.link._ref) : ''
              if(link_current.length){
                link_current = link_current[0].slug.current
                return (
                  <div key={item._key} className={`uk-width-1-1${(index + 1) === data.components.length ? ' uk-margin-large-bottom' : ''}`}>
                    <div className="short-project-item home-short-item">
                      <div className="uk-grid uk-grid-collapse" uk-grid="">
                        <div className="uk-width-auto">
                          <div className="short-project-img-wrap">
                            {item.image && <img src={urlFor(item.image).url()} alt={item.title}/>}
                            {links[index] && <a href={`/${match.params.project}/${link_current}`} className="button_link">
                              <img src={right} alt="right" />
                            </a>}
                          </div>
                        </div>
                        <div className="uk-width-expand">
                          {item.title && <h2><a href={`/${match.params.project}/${link_current}`}>{item.title}</a></h2>}
                          {item.content && <BlockContent blocks={item.content} />}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }else{
                return (
                  <div key={item._key} className={`uk-width-1-1${(index + 1) === data.components.length ? ' uk-margin-large-bottom' : ''}`}>
                    <div className="short-project-item home-short-item">
                      <div className="uk-grid uk-grid-collapse" uk-grid="">
                        <div className="uk-width-auto">
                          <div className="short-project-img-wrap">
                            {item.image && <img src={urlFor(item.image).url()} alt={item.title}/>}
                            {/*{links[index] && <a href={`/${match.params.project}/${link_current}`} className="button_link">
                              <img src={right} alt="right" />
                            </a>}*/}
                          </div>
                        </div>
                        <div className="uk-width-expand">
                          {item.title && <h2>{item.title}</h2>}
                          {item.content && <BlockContent blocks={item.content} />}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            })}


          </div>
        </div>
      </section>

      {data.colorSection && (data.colorSection.title || data.colorSection.content) && <section className="right_block">
        <div className="uk-container">
          <div className="uk-grid uk-grid-collapse" uk-grid="">

          <div className="uk-width-1-1 uk-width-2-3@m">
            <div className="top-info-wrap calculator">
              <div className="top-info">
                {data.colorSection.title && <h1>{data.colorSection.title}</h1>}
                {data.colorSection.content && <h2>{data.colorSection.content}</h2>}
                <div className="uk-grid uk-grid-small uk-child-width-1-1 uk-child-width-1-2@m uk-margin-top" uk-grid="">
                  <div>
                    <div className={`animate-input ${state.width ? 'active-input' : ''}`}>
                      <input type="text" value={state.width} onChange={e => handleCalculate('width', e.target.value)} />
                      <div className="input-info-wrap">
                        <img src={pen} alt="pen" />
                        <label>šířka zdi v m<sup>2</sup></label>
                      </div>
                    </div>
                    <div className={`animate-input ${state.height ? 'active-input' : ''}`}>
                      <input type="text" value={state.height} onChange={e => handleCalculate('height', e.target.value)} />
                      <div className="input-info-wrap">
                        <img src={pen} alt="pen" />
                        <label>výška zdi v m<sup>2</sup></label>
                      </div>
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
              {data.colorSection.image && <div className="img-top-wrap">
                <div className="img-top">
                  <img src={urlFor(data.colorSection.image).url()} alt="Description top" />
                </div>
              </div>}
            </div>

          </div>
        </div>
      </section>}

      {data.galery && (data.galery.title || data.galery.content) && <section className="reference-info">
        <div className="uk-container">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div>
              {data.galery.title && <h2>{data.galery.title}</h2>}
              {data.galery.content && <BlockContent blocks={data.galery.content} />}
            </div>
          </div>
        </div>
      </section>}

      {data.galery && data.galery.images.length && <section className="galery">
        <div className="uk-container">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div>
             {/*index: ${Math.floor(data.galery.images.length / 2)}`}*/}
              <div uk-slider="autoplay: true">
                <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1" >
                  <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-6@m uk-grid" uk-grid="" uk-lightbox="">
                    {data.galery.images.map(item =>
                      <li key={item._key}>
                        <div className="uk-panel">
                          <div className="galery-wrap-img">
                            <a href={urlFor(item.asset).url()} data-alt="Modal some">
                              <img src={urlFor(item.asset).url()} alt="" />
                            </a>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>}
    </Page> : ''
}

export default withRouter(Article)
