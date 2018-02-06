import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AllPolls from './components/AllPolls'
import NewPoll from './components/NewPoll'
import ViewPoll from './components/ViewPoll'
import MyPolls from './components/MyPolls'
import Login from './components/Login'
import Logout from './components/Logout'

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
      <Route path='/auth/login' component={Login}/>
      <Route path='/auth/logout' component={Logout}/>
      <Route path='/auth/google/redirect?code=4/:id' component={MyPolls} />
    </Switch>
  </main>
)

export default Main;
