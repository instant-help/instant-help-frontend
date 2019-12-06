import React, { Component } from 'react'
import Offer_Mini_Profile from './Offer_Mini_Profile'
import { connect } from 'react-redux'
import "../../styles/index.scss"
class Offer_Queue extends Component {

  render(){
    return (
      <div style={{marginTop: '10px'}}>
        <div className="card">
          <div className="card-header text-black primary-thin-color">
          Active Help Requests
          </div>
          <div className="card-body">
            {
              this.props.helperQueue.length === 0 ? 
              <h1>No help is currently requested from you.</h1>: 
              null
            }
            {
              this.props.helperQueue.map( userInQueue => {
                return <Offer_Mini_Profile key={userInQueue.user_Requester[0].id} requesterInfo={userInQueue} requesterProfile={userInQueue.user_Requester[0]} />
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  helperQueue: state.ihelp.helperQueue
})

export default connect(mapStateToProps, null)(Offer_Queue)


