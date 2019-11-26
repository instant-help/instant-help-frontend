import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAuthentication, logIn } from '../actions/authentication'
import '../styles/login.css'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      showErrorMessage: false
    }
  }

  handleSignIn = event => {
    event.preventDefault() 
    const { inputEmail, inputPassword } = event.target
    this.props.logIn(inputEmail.value, inputPassword.value, () => this.props.history.push('/'))
  }
  
  render(){
    return (
      <div className="login">
        <form onSubmit={this.handleSignIn} className="login-form">
          <div className="text-center mb-4">
            <h1 className="h3 mb-3 font-weight-normal">Log in</h1>
          </div>
          <div className="form-label-group">
            <input type="text" name="inputEmail" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
          </div>
          <div className="form-label-group">
            <input type="password" name="inputPassword" id="inputPassword" className="form-control" placeholder="Password" required />
          </div>
          <div className={ !this.state.showErrorMessage ? 'login-auth-error login-hide-auth-error' : 'login-auth-error' }>
            Invalid Username or Password
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => 
  bindActionCreators({
    setAuthentication,
    logIn
  }, dispatch)

export default connect(null, mapDispatchToProps)(Login)
