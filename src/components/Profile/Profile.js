import React, { Component } from 'react'
import { connect } from 'react-redux'
import { refreshUser } from '../../actions/authentication'
import { bindActionCreators } from 'redux'
import "../../styles/index.scss"
import {
  FaPhone,
  FaTwitter,
  FaMapMarkerAlt,
  FaGithub,
  FaLink,
  FaLinkedinIn,
  FaFacebookF,
  FaSkype,
  FaCircle
} from 'react-icons/fa';

import { MdEmail } from "react-icons/md";
import { IconContext } from "react-icons";
import ProfilePicture from "../ProfilePicture"
class Profile extends Component {

  componentDidMount() {
    this.props.refreshUser()
  }

  render() {
    return (
      <div className='container'>
        <div className="card mt-4">
          <div className="card-header text-black primary-thin-color">
            <div className="row">
              <div className='col-12 col-lg-3 col-md-3 col-sm-12 pl-3 text-center text-md-left'>
                <h1><span>{this.props.user.firstname}</span> {this.props.user.lastname}</h1>
              </div>
              <div className='col-12 col-lg-9 col-md-9  col-sm-12  text-center text-md-right'>
                <h1><span className="ml-md-5">{this.props.user.skill}</span></h1>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className='col-12 col-md-3 col-sm-12 text-center'>
                <div className="row">
                  <div className='col-12 col-sm-12 px-sm-3 pt-sm-0 pb-sm-3 p-4'>
                    <div className="row justify-content-center">
                      <div className="col-10 col-sm-8 col-md-12">
                        <div className="profile-image">
                          <ProfilePicture 
                          imageUrl={this.props.user.image}
                          isOnline = { this.props.user.online == "online" }
                          >
                          </ProfilePicture>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-sm-12 text-center justify-content-center xs-only'>
                    <a href="#" className="btn btn-control text-white primary-color align-self-center mb-sm-3 mb-md-0">Update Profile</a>
                  </div>
                </div>
              </div>
              <div className='col-12 col-md-8 col-sm-12 mt-3 mt-sm-0 p-sm-3 p-md-0'>
                <div className="row p-3 px-md-4 py-md-0">
                  <h3 className="card-title">{this.props.user.tagline}</h3>
                  <h5 className="card-text">{this.props.user.description}</h5>
                </div>
              </div>
            </div>
            <div className="row">
              <div className='col-12 col-md-3 col-sm-12 text-center sm-and-up justify-content-center'>
                <a href="#" className="btn btn-control text-white primary-color align-self-center mb-sm-3 mb-md-0">Update Profile</a>
              </div>
              <div className='col-12 col-md-8 col-sm-12 text-center align-self-center'>
                <div className="row justify-content-center ">
                  <div className='col-12 col-md-10 col-sm-8 d-flex justify-content-around align-self-center'>
                    <button type="button" className="btn primary-color btn-circle btn-sm">
                      <IconContext.Provider value={{ color: 'white', size: '18px' }}>
                        <FaPhone />
                      </IconContext.Provider>
                    </button>
                    <button type="button" className="btn primary-color btn-circle btn-sm">
                      <IconContext.Provider value={{ color: 'white', size: '18px' }}>
                        <MdEmail />
                      </IconContext.Provider>
                    </button>
                    <button type="button" className="btn primary-color btn-circle btn-sm">
                      <IconContext.Provider value={{ color: 'white', size: '18px' }}>
                        <FaMapMarkerAlt />
                      </IconContext.Provider>
                    </button>
                    <button type="button" className="btn primary-color btn-circle btn-sm">
                      <IconContext.Provider value={{ color: 'white', size: '18px' }}>
                        <FaLink />
                      </IconContext.Provider>
                    </button>
                    <button type="button" className="btn primary-color btn-circle btn-sm">
                      <IconContext.Provider value={{ color: 'white', size: '18px' }}>
                        <FaGithub />
                      </IconContext.Provider>
                    </button>
                    <button type="button" className="btn primary-color btn-circle btn-sm">
                      <IconContext.Provider value={{ color: 'white', size: '18px' }}>
                        <FaLinkedinIn />
                      </IconContext.Provider>
                    </button>
                    <button type="button" className="btn primary-color btn-circle btn-sm">
                      <IconContext.Provider value={{ color: 'white', size: '20px' }}>
                        <FaTwitter />
                      </IconContext.Provider>
                    </button>
                    <button type="button" className="btn primary-color btn-circle btn-sm">
                      <IconContext.Provider value={{ color: 'white', size: '18px' }}>
                        <FaFacebookF />
                      </IconContext.Provider>
                    </button>
                    <button type="button" className="btn primary-color btn-circle btn-sm">
                      <IconContext.Provider value={{ color: 'white', size: '20px' }}>
                        <FaSkype />
                      </IconContext.Provider>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    refreshUser
  }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
