import React from 'react'

import right from '../../assets/right.svg'

const Breadcrumb = ({project, article = ''}) => {
  return(
    <div className="breadcrumb">
      <nav>
        <ul>
          <li><a href="/">Hlavní strana</a><img src={right} alt="right" /></li>
          {project && !article ? <li><span>{project.title}</span></li> : <li><a href={`/${project.link}`}>{project.title}</a><img src={right} alt="right" /></li>}
          {article && <li><span>{article}</span></li>}
        </ul>
      </nav>
    </div>
  )
}

export default Breadcrumb
