import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AllPolls from './components/AllPolls'
import NewPoll from './components/NewPoll'
import ViewPoll from './components/ViewPoll'
import MyPolls from './components/MyPolls'
import Login from './components/Login'
import Logout from './components/Logout'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={AllPolls}/>
      <Route exact path='/newpoll' component={NewPoll}/>
      <Route path='/mypolls/' component={MyPolls}/>
      <Route path='/viewpoll/:id' component={ViewPoll}/>
      <Route path='/auth/login' component={Login}/>
      <Route path='/auth/logout' component={Logout}/>
      <Route path='/auth/google/redirect?code=4/:id' component={MyPolls}/>
    </Switch>
  </main>
)

export default Main;
