import { useState } from 'react'
import Page from '../../layout/Page'
import Breadcrumb from '../../components/breadcrumb'
import { useRouter } from 'next/router'
import ReactScroll from 'react-scroll'
import Link from 'next/link'
import BlockContent from "@sanity/block-content-to-react";
import sanityClient from "../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source);

export async function getServerSideProps({params, locale}) {

  const query = `*[_type == "product" && slug.current == $url] {
    image,
    title,
    insideTitle,
    content,
    components,
    colorSection,
    galery,
    "links": components[].link._ref,
    "projectMenu": *[_type == "project" && slug.current == $project]{ menu }[0...1],
    meta
  }[0]
  `;

  const newQuery = `*[_type in ["product", "project"] && _id match $ids] {
    _id,
    slug
  }[0...100]`

  const data = await sanityClient.fetch(query, { url: params.article, project: params.project })

  if(!data?.title){
    return{
      notFound: true
    }
  }

  const links = await sanityClient.fetch(newQuery, { ids: JSON.stringify(data.links)})

  return {
    props: {
      data,
      links
    }
  }
}

const Article = ({data, links}) => {

  const router = useRouter()

  const [state, setState] = useState({
    width: 0,
    height: 0,
    square: 0,
    price: 0
  })

  const handleCalculate = (name, value) => {
    if((+value || value === '') && +value <= 1000){
      var newState = {...state}
      if(+value){
        if(value.substr(0, 1) === 0 || value.substr(0, 1) === "0"){
          newState[name] = value.substr(1, value.length)
        }else{
          newState[name] = value
        }
      }else if(value === ''){
        newState[name] = 0
      }
      newState.square = Math.round(((newState.width * newState.height) + Number.EPSILON) * 100) / 100
      newState.price = Math.round(((newState.square * data.colorSection.price) + Number.EPSILON) * 100) / 100
      setState({...newState})
    }
  }

  if(!data?.title){
    return ''
  }

  return <Page
            title={data?.meta?.title}
            description={data?.meta?.description}
            image={urlFor(data?.meta?.image).width(1200).height(630).url()}
            ogTitle={data?.meta?.ogTitle}
            ogDescription={data?.meta?.ogDescription}
          >
      <section className="sec-head">
        <div className="uk-container">
          <div className="uk-grid uk-grid-collapse" uk-grid="">
            <div className="uk-width-1-1 uk-width-1-3@m">
              {data.image && <div className="img-top-wrap">
                <div className="img-top">
                  <img src={urlFor(data.image).width(432).url()} alt={data.title} />
                </div>
              </div>}
            </div>
            <div className="uk-width-1-1 uk-width-2-3@m">
              <div className="top-info-wrap">
                <div className="top-info">
                  {data.title && <Breadcrumb project={{link: router.query.project, title: data.projectMenu[0].menu }} article={data.title}/>}
                  {data.title && <h1>{data.title}</h1>}
                  <ReactScroll.Link className="button_arrow button_green" to="section1" spy={true} smooth={true} duration={1000}>
                    <img className="uk-svg" src="/assets/down.svg" uk-svg="" alt="Arrow down" />
                  </ReactScroll.Link>
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

            {data.components && !!data.components.length && data.components.map((item, index) => {
              var link_current = item.link ? links.filter(itemLink => itemLink._id === item.link._ref) : ''
              if(link_current.length){
                link_current = link_current[0].slug.current
                return (
                  <div key={item._key} className={`uk-width-1-1${(index + 1) === data.components.length ? ' uk-margin-large-bottom' : ''}`}>
                    <div className="short-project-item home-short-item">
                      <div className="uk-grid uk-grid-collapse" uk-grid="">
                        <div className="uk-width-auto">
                          <div className="short-project-img-wrap">
                            {item.image && <img src={urlFor(item.image).width(252).url()} alt={item.title}/>}
                            {links[index] && <Link href={`/${router.query.project}/${link_current}`}><a className="button_link">
                              <img className="uk-svg" src="/assets/right.svg" uk-svg="" alt="right" />
                            </a></Link>}
                          </div>
                        </div>
                        <div className="uk-width-expand">
                          {item.title && <h2><Link href={`/${router.query.project}/${link_current}`}><a>{item.title}</a></Link></h2>}
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
                            {item.image && <img src={urlFor(item.image).width(252).url()} alt={item.title}/>}
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
                        <img className="uk-svg" src="/assets/pen.svg" uk-svg="" alt="pen" />
                        <label>šířka zdi v m</label>
                      </div>
                    </div>
                    <div className={`animate-input ${state.height ? 'active-input' : ''}`}>
                      <input type="text" value={state.height} onChange={e => handleCalculate('height', e.target.value)} />
                      <div className="input-info-wrap">
                        <img className="uk-svg" src="/assets/pen.svg" uk-svg="" alt="pen" />
                        <label>výška zdi v m</label>
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
                  <img src={urlFor(data.colorSection.image).width(432).url()} alt="Description top" />
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
                              <img src={urlFor(item.asset).width(167).url()} alt="" />
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

export default Article
