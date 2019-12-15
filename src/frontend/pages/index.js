import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Homepage from './homepage'
import Project from './project'
import Article from './article'

export default () =>
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/:project" component={Project} />
    <Route exact path="/:project/:article" component={Article} />
  </Switch>
