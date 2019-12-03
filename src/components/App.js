import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { refreshUser } from '../actions/authentication'
import Home from './Home'
import Header from './Header'
import Login from './Login'
import Signup from './Signup'
import Request_Help from './Request_Help/Request_Help'
import Offer from './Offer_Help/Offer'
import Session from './Session/Session'
import ProfileSettings from './Profile/ProfileSettings'
import ProfileNewForm from './Profile/ProfileNewForm'
import Profile from './Profile/Profile'
import AuthenticatedRoute from '../higherOrderComponents/AuthenticatedRoute'
import '../styles/nav.css'

class App extends Component {
  componentDidMount(){
    this.props.refreshUser()    
  }

  render() {
    return (
    <div>
      <BrowserRouter>
        <div                 
        className={"navColor"}
>
          <div className="container">
          <Header/>  
          </div>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <AuthenticatedRoute path='/session' component={Session} />
            <AuthenticatedRoute path='/profileSettings' component={ProfileSettings} />
            <Route path='/profileNewForm' component={ProfileNewForm} />
            <AuthenticatedRoute path='/requestHelp' component={Request_Help} />
            <AuthenticatedRoute path='/offerHelp' component={Offer} />
            <AuthenticatedRoute path='/profile' component={Profile} />
            <Route path='/' component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    refreshUser,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
