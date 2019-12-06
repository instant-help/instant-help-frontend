import React, { Component } from 'react'
import { connect } from 'react-redux'

class ProfileSettings extends Component {

  render(){
    return (
      <div className="container">
        <form>
          <div className="card">
            <div className="card-header">
              Personal Information
            </div>
            <div className="card-body">
              <div className="form-row">
            <div className="form-group col-md-5">
              <label htmlFor="inputFirstName">First Name</label>
              <input type="text" className="form-control" id="inputFirstName" placeholder="First Name"/>
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="inputLastName">Lirst Name</label>
              <input type="text" className="form-control" id="inputLastName" placeholder="Last Name"/>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputAge">Age</label>
              <input type="text" className="form-control" id="inputAge" placeholder="Age"/>
            </div>
          </div>
          <div className="form-row">
          <div className="form-group col-md-4">
              <label htmlFor="inputEmail">Email</label>
              <input type="email" className="form-control" id="inputEmail" placeholder="Email"/>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputPhone">Phone</label>
              <input type="text" className="form-control" id="inputPhone" placeholder="Phone"/>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputProfileImage">Profile Image</label>
              <input type="text" className="form-control" id="inputLastName" placeholder="Image Link"/>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputAddress">Address</label>
              <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input type="text" className="form-control" id="inputCity"placeholder="City"/>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-5">
              <label htmlFor="inputState">State</label>
              <input htmlFor="inputState" className="form-control" id="inputState" placeholder="State"/>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputZip">Zip</label>
              <input type="text" className="form-control" id="inputZip"placeholder="Zip"/>
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="inputCountry">Country</label>
              <input type="text" className="form-control" id="inputCountry"placeholder="Country"/>
            </div>
          </div>
            </div>
          </div>
          <div className="card" style={{marginTop: '10px'}}>
            <div className="card-header">
            Profile Information
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Developer Skill Level</label>
                <select className="form-control" id="exampleFormControlSelect1">
                  <option>New Developer</option>
                  <option>Jr. Developer</option>
                  <option>Mid. Developer</option>
                  <option>Sr. Developer</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Profile Tagline</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" placeholder="Write a short tagline for your profile"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Profile Description</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Tell us more about your passions and skills"></textarea>
              </div>
            </div>
          </div>
          <button style={{marginTop: '10px'}} type="submit" className="btn btn-primary">Update Profile</button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.authentication.user
})

export default connect(mapStateToProps, null)(ProfileSettings)