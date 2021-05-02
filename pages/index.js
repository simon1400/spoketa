import React, {useState, useEffect} from 'react'
import Page from '../layout/Page'
import ReactScroll from 'react-scroll'
import BlockContent from "@sanity/block-content-to-react";
import sanityClient from "../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";
import Link from 'next/link'

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source);

export async function getServerSideProps({params, locale}) {

  const query = `*[_type == "homepage"] {
    title,
    image,
    slug,
    components,
    colorSection,
    "links": components[].link._ref,
    galery,
    meta
  }[0]
  `;

  const newQuery = `*[_type in ["product", "project"] && _id match $ids] {
    _id,
    slug
  }[0...100]`

  const data = await sanityClient.fetch(query)

  const links = await sanityClient.fetch(newQuery, { ids: JSON.stringify(data.links)})

  return {
    props: {
      data,
      links
    }
  }
}

const Homepage = ({links, data}) => {

  if(data?._id){
    return ''
  }

  return <Page
            title={data?.meta?.title}
            description={data?.meta?.description}
            image={urlFor(data?.meta?.image).width(1200).height(630).url()}
            ogTitle={data?.meta?.ogTitle}
            ogDescription={data?.meta?.ogDescription}
            id="homepage">
      <section className="sec-head">
        <div className="uk-container">
          <div className="uk-grid uk-grid-collapse" uk-grid="">
            <div className="uk-width-1-1 uk-width-1-3@m">
              <div className="img-top-wrap">
                <div className="img-top">
                  <img
                    className="uk-img"
                    data-src={urlFor(data.image).auto('format').url()}
                    data-srcset={`${urlFor(data.image).width(400).auto('format').url()} 400w,
                                  ${urlFor(data.image).width(450).auto('format').url()} 1000w`}
                    alt={data.title}
                    uk-img="" />
                </div>
              </div>
            </div>
            <div className="uk-width-1-1 uk-width-2-3@m">
              <div className="top-info-wrap">
                <div className="top-info">
                  <span>SPOKETA s.r.o.</span>
                  <h1>{data.title}</h1>
                  <ReactScroll.Link className="button_arrow button_green" to="section1" spy={true} smooth={true} duration={1000}>
                    <img className="uk-svg" src="/assets/down.svg" height="17" uk-svg="" alt="Arrow down" />
                  </ReactScroll.Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="section1" className="home-short">
        <div className="uk-container">
          <div className="uk-flex uk-flex-around uk-flex-wrap">
            {data.components && !!data.components.length && data.components.map(item => {
              var link_current;
              if(item.link){
                link_current = links.filter(itemLink => itemLink._id === item.link._ref)
              }else{
                link_current = []
              }

              if(link_current.length){
                link_current = link_current[0].slug.current
                return (
                  <div key={item._key} className="home-short-item">
                    <h2><Link href={link_current}><a>{item.title}</a></Link></h2>
                    {item.content && <BlockContent blocks={item.content} />}
                    <Link href={link_current}><a className="button_bare">Více informací <img className="uk-svg" src="/assets/right.svg" uk-svg="" height="13" alt="Arrow right" /></a></Link>
                  </div>
                )
              }
            }

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
                  {data.colorSection?.content && <BlockContent blocks={data.colorSection.content} />}
                  <Link href={`/${data.colorSection.link}`}><a className="button_blue">Více o nás <img className="uk-svg" src="/assets/right.svg" uk-svg="" height="13" alt="Arrow right" /></a></Link>
                </div>
              </div>
            </div>

            <div className="uk-width-1-1 uk-width-1-3@m">
              <div className="img-top-wrap">
                <div className="img-top">
                  <img
                    className="uk-img"
                    data-src={urlFor(data.colorSection.image).auto('format').url()}
                    data-srcset={`${urlFor(data.colorSection.image).width(400).auto('format').url()} 400w,
                                  ${urlFor(data.colorSection.image).width(450).auto('format').url()} 1000w`}
                    alt={data.colorSection.title}
                    uk-img="" />
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
              {data.galery?.content && <BlockContent blocks={data.galery.content} />}
            </div>
          </div>
        </div>
      </section>

      {data.galery && !!data.galery.images.length && <section className="galery">
        <div className="uk-container">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">
            <div>
              <div uk-slider="autoplay: true">
                <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1" >
                  <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-6@m uk-grid" uk-grid="" uk-lightbox="">
                    {data.galery.images.map(item =>
                      <li key={item._key}>
                        <div className="uk-panel">
                          <div className="galery-wrap-img">
                            <a href={urlFor(item.asset).url()} data-alt="Modal some">
                              <img src={urlFor(item.asset).width(167).url()} alt={item._key} />
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
    </Page>

}

export default Homepage
