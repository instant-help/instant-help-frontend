import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSession, setRequestByRequestID, updateRequestStatus, setRequesterProfile, setHelperProfile, startSession } from '../../actions/ihelp'
import { refreshUser } from '../../actions/authentication'
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
class Offer_Mini_Profile extends Component {


  onClickStartSession  = async () => {
    const userStatus = this.props.user.queue_status
    if (userStatus === "offering help in session")
      return alert('Option disabled. User is in a session')
    const queue_id = this.props.requesterInfo.queues_id
    const request_id = this.props.requesterInfo.request_id
    const requesterUserId = this.props.requesterProfile.id
    const helperUserId = this.props.user.id
    await this.props.startSession( queue_id, request_id, requesterUserId, helperUserId, () => this.props.history.push('/session'))
    await this.props.createSession( queue_id, request_id, requesterUserId, helperUserId )
    await this.props.updateRequestStatus(request_id, 'in session')
    await this.props.setRequestByRequestID(request_id)
    await this.props.refreshUser()
    await this.props.setHelperProfile(helperUserId)
    await this.props.setRequesterProfile(requesterUserId)
    await this.props.history.push('/session')
    await this.props.startSession(queue_id, request_id, requesterUserId, helperUserId, () => this.props.history.push('/session'))
  }
  
  render() {
    return (
      <div className='container'>
        <div className="card mt-4">
          <div className="card-header text-black primary-thin-color">
            <div className="row">
              <div className='col-12 col-lg-3 col-md-3 col-sm-12 pl-3 text-center text-md-left'>
                <h1><span>{this.props.requesterProfile.firstname}</span> {this.props.requesterProfile.lastname}</h1>
              </div>
              <div className='col-12 col-lg-9 col-md-9  col-sm-12  text-center text-md-right'>
                <h1><span className="ml-md-5">{this.props.requesterProfile.skill}</span></h1>
              </div>
            </div>
          </div>
          <div className="card-body row ">
            <div className='col-12 col-md-3 col-sm-12 text-center'>
              <div className="row">
                <div className='col-12 col-md-12 col-sm-6 px-sm-3 pt-sm-0 pb-sm-3 p-4'>
                  <div className="profile-image">
                    <span className="notify-badge">
                      <IconContext.Provider value={{ color: 'green', size: '30px' }}>
                        <FaCircle />
                      </IconContext.Provider>
                    </span>
                    <img className="rounded-circle img-fluid" src={this.props.requesterProfile.image} />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-8 col-sm-12 mt-3 mt-sm-0' style={{ marginLeft: '1px' }}>
              <h3 className="card-title">{this.props.requesterProfile.tagline}</h3>
              <h5 className="card-text">{this.props.requesterProfile.description}</h5>
            </div>
            {/* {
              !this.state.currentHelper ?  
              <a onClick={this.onClickPostQueue} className="btn btn-primary">{this.state.buttonText}</a> :
              <a onClick={this.onClickExitQueue}  className="btn btn-secondary">Exit Queue</a>
            }
          */}
          </div>
          {/* {
              this.state.button ? this.currentHelper() :
              null
            } */}
          <a onClick={this.onClickStartSession} className="btn btn-bg text-white primary-color btn-block">Start Session</a>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.authentication.user,
  requestInfo: state.ihelp.requestInfo
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateRequestStatus,
    createSession,
    setRequesterProfile,
    setHelperProfile,
    refreshUser,
    setRequestByRequestID,
    startSession
  }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Offer_Mini_Profile))