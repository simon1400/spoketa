import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Homepage from './homepage'
import Project from './project'
import Article from './article'
import NotFound from './not-found'

export default () =>
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/project/:project" component={Project} />
    <Route exact path="/project/:project/:article" component={Article} />

    <Route component={NotFound} />
  </Switch>
