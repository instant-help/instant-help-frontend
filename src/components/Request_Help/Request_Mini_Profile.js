import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { postQueue, objIsEmpty, deleteQueueRequest, checkIfInHelperQueue } from '../../actions/ihelp'
import { userStatus } from '../../actions/authentication'
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
class Request_Mini_Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      button: false,
      currentHelper: false,
      buttonText: "Enter Queue"
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user.queue_status.includes('request')) {
      return { ...prevState, button: true }
    }
    // if (nextProps.user.queue_status.includes('request in queue')){
    //   if (this.props.requestInfo.helperID)
    //   return { ...prevState, button: true}
    // }
    if (nextProps.user.queue_status.includes('available')) {
      return { ...prevState, button: false }
    }
    return prevState
  }

  testing = async () => {
    console.log('WORKING test 1 ')
    const result = await this.props.checkIfInHelperQueue(this.props.requestInfo.id, this.props.helper.id)
    await console.log('WORKING test 2 ')
    console.log(result)
    console.log('WORKING test 3 ')
  }

  onClickExitQueue = () => {
    if (!objIsEmpty(this.props.session)) { return alert("Request is in Session") }
    let requestID = this.props.requestInfo.id
    let requesterID = this.props.requestInfo.user_id
    console.log(requestID)
    this.props.deleteQueueRequest(requestID, requesterID)
    this.props.userStatus('put', 'request pending')
    this.setState({ currentHelper: false })
  }

  onClickPostQueue = () => {
    if (this.props.user.queue_status !== 'request pending') { return alert("Make a new request") }
    let requestID = this.props.requestInfo.id
    let requesterID = this.props.requestInfo.user_id
    let helperID = this.props.helper.id
    this.props.postQueue(requestID, helperID, requesterID)
    this.props.userStatus('put', 'request in queue')
    this.setState({ currentHelper: true })
  }

  currentHelper = () => {
    if (!this.state.currentHelper)
      return <div><a onClick={this.onClickPostQueue} className="btn btn-bg text-white primary-color btn-block">{this.state.buttonText}</a></div>
    else return <a onClick={this.onClickExitQueue} className="btn btn-bg text-white primary-red btn-block">Exit Queue</a>
  }

  render() {

    return (
      <div className='container' style={{ marginBottom: '20px' }}>
        <div className='container'>
          <div className="card mt-4">
            <div className="card-header text-black primary-thin-color">
              <div className="row">
                <div className='col-12 col-lg-3 col-md-3 col-sm-12 pl-3 text-center text-md-left'>
                  <h1><span>{this.props.helper.firstname}</span> {this.props.helper.lastname}</h1>
                </div>
                <div className='col-12 col-lg-9 col-md-9  col-sm-12  text-center text-md-right'>
                  <h1><span className="ml-md-5">{this.props.helper.skill}</span></h1>
                </div>
              </div>
            </div>
            <div className="card-body row ">
              <div className='col-12 col-md-3 col-sm-12 text-center'>
                <div className="row">
                  <div className='col-12 col-md-12 col-sm-6 px-sm-3 pt-sm-0 pb-sm-3 p-4'>
                    <div className="profile-image">
                      <ProfilePicture
                        imageUrl={this.props.helper.image}
                        isOnline={this.props.user.online == "online"}
                      >
                        ></ProfilePicture>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-12 col-md-8 col-sm-12 mt-3 mt-sm-0' style={{ marginLeft: '1px' }}>
                <h3 className="card-title">{this.props.helper.tagline}</h3>
                <h5 className="card-text">{this.props.helper.description}</h5>
              </div>
              {/* {
              !this.state.currentHelper ?  
              <a onClick={this.onClickPostQueue} className="btn btn-primary">{this.state.buttonText}</a> :
              <a onClick={this.onClickExitQueue}  className="btn btn-secondary">Exit Queue</a>
            }
          */}
            </div>
            {
              this.state.button ? this.currentHelper() :
                null
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  offeringHelp: state.ihelp.offeringHelp,
  user: state.authentication.user,
  requestInfo: state.ihelp.requestInfo,
  session: state.ihelp.session
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    postQueue,
    objIsEmpty,
    deleteQueueRequest,
    checkIfInHelperQueue,
    userStatus
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Request_Mini_Profile)