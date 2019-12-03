import React, { Component } from 'react'
import request from '../../utils/request'
import { connect } from 'react-redux'
import { setAuthentication, createUserAccount, logIn } from '../../actions/authentication'
import { bindActionCreators } from 'redux'



class ProfileNewForm extends Component {
  constructor(props){
    super(props) 
    this.state = {
      showErrorMessage: false,
      skill: 'New Developer',
      online: 'online'
    } 
  }

    onSubmit = async (e) => {
    e.preventDefault()
    let username = this.state.username
    let password = this.state.password
    delete this.state.password
    delete this.state.username
    let update = this.state
    delete update.showErrorMessage

    request('/users','post', {
      username: username,
      password: password })
    .then(response => {
      console.log(response)
      return request('/auth/token', 'post', {
        username: username,
        password: password })
    })   
    .then(response => {
      localStorage.setItem('token', response.data.token)
      return request('/auth/token')
    })
    .then(response => {
      let userID = response.data.id
      this.props.setAuthentication(response.data)
      request(`/users/${userID}`,'put', {...update })
    })
    .then( response => {
      this.props.history.push('/profile')
    })
    .catch(error => { 
      this.props.setAuthentication(null)
      this.setState({showErrorMessage: true, showSuccessMessage: false })
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render(){
    
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>

        <div className="card">
            <div className="card-header text-black bg-warning">
              Sign Up
            </div>
            <div className="card-body">
              <div className="form-row">
                <div className="form-group col-md-5">
                  <label htmlFor="inputUserName">User Name</label>
                  <input type="text" name="username" className="form-control" id="inputUsername" placeholder="User Name" onChange={ this.onChange } required />
                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="inputPassword">Password</label>
                  <input type="text" name="password" className="form-control" id="inputPassword" placeholder="Password" onChange={ this.onChange } required />
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{marginTop: '10px'}}>
            <div className="card-header text-black bg-warning">
              User Information 
            </div>
            <div className="card-body">
              <div className="form-row">
            <div className="form-group col-md-5">
              <label htmlFor="inputFirstName">First Name</label>
              <input type="text" name="firstname" className="form-control" id="inputFirstName" placeholder="First Name" onChange={ this.onChange } required />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="inputLastName">Last Name</label>
              <input type="text" name="lastname" className="form-control" id="inputLastName" placeholder="Last Name" onChange={ this.onChange } required />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputAge">Age</label>
              <input type="text" name="age" className="form-control" id="inputAge" placeholder="Age"  onChange={ this.onChange } />
            </div>
          </div>
          <div className="form-row">
          <div className="form-group col-md-4">
              <label htmlFor="inputEmail">Email</label>
              <input type="email" name="email" className="form-control" id="inputEmail" placeholder="Email" onChange={ this.onChange } />
            </div>
            <div className="form-group col-md-4"> 
              <label htmlFor="inputPhone">Phone</label>
              <input type="number" name="phone" className="form-control" id="inputPhone" placeholder="Phone" onChange={ this.onChange } />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputProfileImage">Profile Image</label>
              <input type="text" name="image" className="form-control" id="inputLastName" placeholder="Image Link"  onChange={ this.onChange } />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputAddress">Address</label>
              <input type="text" name="street" className="form-control" id="inputAddress" placeholder="1234 Main St"onChange={ this.onChange } />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input type="text" name="city" className="form-control" id="inputCity"placeholder="City" onChange={ this.onChange } />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-5">
              <label htmlFor="inputState">State</label>
              <input htmlFor="inputState" name="state" className="form-control" id="inputState" placeholder="State"onChange={ this.onChange } />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputZip">Zip</label>
              <input type="text" name="zip" className="form-control" id="inputZip"placeholder="Zip" onChange={ this.onChange } />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="inputCountry">Country</label>
              <input type="text" name="country" className="form-control" id="inputCountry"placeholder="Country" onChange={ this.onChange } />
            </div>
          </div>
            </div>
          </div>
          <div className="card" style={{marginTop: '10px'}}>
            <div className="card-header text-black bg-warning">
            Profile Information
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Developer Skill Level</label>
                <select name="skill" className="form-control" id="exampleFormControlSelect1" value={this.state.devSkill} onChange={ this.onChange } >
                  <option value='New Developer'>New Developer</option>
                  <option value='Jr. Developer'>Jr. Developer</option>
                  <option value='Mid. Developer'>Mid. Developer</option>
                  <option value='Sr. Developer'>Sr. Developer</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Profile Tagline</label>
                <textarea name="tagline" className="form-control" id="exampleFormControlTextarea1" rows="1" placeholder="Write a short tagline for your profile" onChange={ this.onChange } ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Profile Description</label>
                <textarea name="description" className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Tell us more about your passions and skills" onChange={ this.onChange } ></textarea>
              </div>
            </div>
          </div>
          <button style={{margin: '25px 0px 50px 10px'}} type="submit" className="btn btn-warning btn-lg">Create Profile</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNewForm)
