import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSession, setRequestByRequestID, updateRequestStatus, setRequesterProfile, setHelperProfile, startSession } from '../../actions/ihelp'
import { refreshUser } from '../../actions/authentication'

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
    
    // await this.props.createSession( queue_id, request_id, requesterUserId, helperUserId )
    // await this.props.updateRequestStatus(request_id, 'in session')
    // await this.props.setRequestByRequestID(request_id)
    // await this.props.refreshUser()
    // await this.props.setHelperProfile(helperUserId)
    // await this.props.setRequesterProfile(requesterUserId)
    // await this.props.history.push('/session')
  }
  
  render(){
    return (
    <div className='container'>        
      <p className="card-text "> </p>
      <div className="card">   
        <h1 className="card-header"><span style={{marginLeft: '150px'}}>{this.props.requesterProfile.firstname}</span> {this.props.requesterProfile.lastname}</h1>
        <div className="card-body row">
          <div className='col-2 '>
            <img  className="rounded-circle " height="150" width="150" src={this.props.requesterProfile.image} />
          </div>
          <div className='col-7'>
            <h3 className="card-title">{this.props.requesterProfile.tagline}</h3>
            <h5 className="card-text">{this.props.requesterProfile.description}</h5>
          </div>
          <div className='col'>
            <div><h3>{this.props.requesterProfile.skill}</h3></div>
            <div>{this.props.requesterProfile.online}</div>
            <div> {this.props.requesterProfile.queue_status}</div>
            <a  onClick={this.onClickStartSession} className="btn btn-primary">Start Session</a>
          </div>
        </div>
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


