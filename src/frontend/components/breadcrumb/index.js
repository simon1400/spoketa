import React from 'react'

const Breadcrumb = ({project, article = ''}) => {
  return(
    <div className="breadcrumb">
      <nav>
        <ul>
          <li><a href="/">Hlavní strana</a></li>
          {project && <li>{!article ? <span>{project.title}</span> : <a href={`/${project.link}`}>{project.title}</a>}</li>}
          {article && <li><span>{article}</span></li>}
        </ul>
      </nav>
    </div>
  )
}

export default Breadcrumb
