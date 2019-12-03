import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAuthentication, createUserAccount, logIn } from '../actions/authentication'
import request from '../utils/request'
import '../styles/login.css'

class Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
      showErrorMessage: false,
      newUser: { 
        skill: 'New Developer',
        online: 'online'
      }
    }
  }

  handleSignIn = event => {
    event.preventDefault()
    const { inputEmail, inputPassword } = event.target



    // this.props.createUserAccount(inputEmail, inputPassword)
    // this.props.logIn(inputEmail, inputPassword)
    // this.props.history.push('/ProfileNewForm')

    request('/users','post', {
      username: inputEmail.value,
      password: inputPassword.value })
    .then(response => {
      console.log('response')
      return request('/auth/token', 'post', {
        username: inputEmail.value,
        password: inputPassword.value })
    })   
    .then(response => {
      localStorage.setItem('token', response.data.token)
      return request('/auth/token')
    })
    .then(response => {
      this.props.setAuthentication(response.data)
      this.props.history.push('/ProfileNewForm')
    })
    .catch(error => { 
      this.props.setAuthentication(null)
      this.setState({showErrorMessage: true, showSuccessMessage: false })
    })
  }


  render(){
    return (
      <div className="Signup">
        <form onSubmit={this.handleSignIn} className="login-form">
          <div className="text-center mb-4">
            <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
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
          <button className="btn btn-lg btn-warning btn-block" type="submit">Sign Up</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user
})

const mapDispatchToProps = dispatch => 
  bindActionCreators({
    setAuthentication,
    createUserAccount,
    logIn
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps,)(Signup)
