import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SessionConnectionProfiles from './SessionConnectionProfiles'
import { refreshUser } from '../../actions/authentication'
import { getActiveSessionInfo, updateUserQueueStatus, updateSessionStatus, updateRequestStatus, deleteRequestFromQueue } from '../../actions/ihelp'

import RequestId from '../../higherOrderComponents/RequestId'

class Session extends Component {

  componentDidMount = async () => {
    // await window.gapi.hangout.render('placeholder-div', { 'render': 'createhangout' })
  }

  endSession = async () => {
    if (!this.props.user.queue_status.includes('session'))
      return alert('Session is not started')
    await this.props.getActiveSessionInfo()
    if (!this.props.session[0].session_status) {
      return alert('Session is ended')
    }
    const requestID = this.props.requestInfo.id
    const helperID = this.props.helperUserProfile.id
    const requesterID = this.props.requesterUserProfile.id
    this.props.updateUserQueueStatus(helperID, 'offering help')
    this.props.updateUserQueueStatus(requesterID, 'available')
    this.props.updateSessionStatus(requestID, 'closed')
    this.props.updateRequestStatus(requestID, 'closed')
    this.props.deleteRequestFromQueue(requestID)
    alert('You have ended your session')
    this.props.refreshUser()
  }


  render(){
    return (
      <div className='container'>
        <RequestId>
          <div>
            <div>
              <div className="card">
                <div className="card-header">
                  <div className="row justify-content-around" style={{marginBottom: '10px'}}>
                    <div id="placeholder-div"></div>
                    <button onClick={() => this.endSession()} className="btn btn-primary btn-sm col-2">End</button> 
                  </div>
                </div>
                <div className="card-body">
                  <div className='container'>
                    <div className="card">
                      <div className="card-header">
                      Request Description
                      </div>
                      <div className="card-body">
                      {
                        (this.props.requestInfo && this.props.requestInfo.description) ?  
                        <h5 className="card-title">{this.props.requestInfo.description}</h5> :
                        null 
                      }
                      </div>
                    </div>
                  </div>
                </div>
                <div className='container'>
                {
                  this.props ? 
                  <SessionConnectionProfiles /> : 
                  null
                }
                </div>
              </div> 
            </div>
          </div>
        </RequestId>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user,
  session: state.ihelp.session,
  requestInfo: state.ihelp.requestInfo,
  helperUserProfile: state.ihelp.helperUserProfile,
  requesterUserProfile: state.ihelp.requesterUserProfile
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    refreshUser,
    updateUserQueueStatus,
    updateRequestStatus,
    updateSessionStatus,
    deleteRequestFromQueue,
    getActiveSessionInfo,
  }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Session)





