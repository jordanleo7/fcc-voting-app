import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AllPolls from './components/AllPolls'
import NewPoll from './components/NewPoll'
import ViewPoll from './components/ViewPoll'
import MyPolls from './components/MyPolls'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={AllPolls}/>
      <Route exact path='/newpoll' component={NewPoll}/>
      <Route path='/mypolls/:id' component={MyPolls}/>
      <Route path='/viewpoll/:id' component={ViewPoll}/>
    </Switch>
  </main>
)

export default Main;
