import React, {useState, useEffect} from 'react'
import Page from '../../layout/page'

// import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import BlockContent from "@sanity/block-content-to-react";
import sanityClient from "../../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";

import img from '../../assets/img.jpg'
import down from '../../assets/down.svg'
import right from '../../assets/right.svg'

const imageBuilder = imageUrlBuilder(sanityClient);

const urlFor = source => imageBuilder.image(source);

const query = `*[_type == "homepage"] {
  title,
  description,
  image,
  slug,
  components,
  colorSection,
  galery,
  titleHead
}[0...1]
`;

const Homepage = () => {

  const [dataArray, setDataArray] = useState([])

  useEffect(() => {
    sanityClient
      .fetch(query)
      .then(data => setDataArray([...data]))
      .catch(err => console.log(err));

  }, [])

  var data = dataArray[0]

  return dataArray.length ? <Page title={data.titleHead} description={data.description} id="homepage">
      <section className="sec-head">
        <div className="uk-container">
          <div className="uk-grid uk-grid-collapse" uk-grid="">
            <div className="uk-width-1-1 uk-width-1-3@m">
              <div className="img-top-wrap">
                <div className="img-top">
                  <img src={urlFor(data.image).url()} alt={data.titleHead} />
                </div>
              </div>
            </div>
            <div className="uk-width-1-1 uk-width-2-3@m">
              <div className="top-info-wrap">
                <div className="top-info">
                  <span>SPOKETA s.r.o.</span>
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

      <section id="section1" className="home-short">
        <div className="uk-container">
          <div className="uk-flex uk-flex-around uk-flex-wrap">
            {data.components.map(item =>
              <div key={item._key} className="home-short-item">
                <h2>{item.title}</h2>
                <BlockContent blocks={item.content} />
                <a href={item.link} className="button_bare">Více informací <img src={right} alt="Arrow right" /></a>
              </div>
            )}
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
                  <h1>{data.colorSection.title}</h1>
                  <BlockContent blocks={data.colorSection.content} />
                  <a href={data.colorSection.link} className="button_blue">Více o nás <img src={right} alt="Arrow right" /></a>
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
            {data.galery.images.map(item =>
              <li key={item._key}>
                <div className="uk-panel">
                  <div className="galery-wrap-img">
                    <img src={urlFor(item.asset).url()} alt="" />
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

export default Homepage
