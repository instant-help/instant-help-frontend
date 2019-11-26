import React, { Component } from 'react'
import OfferQueue from './Offer_Queue'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import  { userStatus }  from '../../actions/authentication'
import { getHelperQueue } from '../../actions/ihelp'

class Offer extends Component {

  componentDidMount(){
    this.props.getHelperQueue()
  }

  onClickOfferHelp = () => {
    this.props.userStatus('put',"offering help")
    this.props.getHelperQueue()
  }

  onClickStopOfferingHelp = () => {
    this.props.userStatus('put',"available")
    this.props.getHelperQueue()
  }


  render(){
    
    return (
      <div className='container'>
        <button  onClick={this.onClickOfferHelp} type="button"  className="btn btn-primary btn-lg btn-block">
          {
            this.props.user.queue_status === 'available' ? 
            'Start Offering Help' : 
            'Accepting Requests'
          }
        </button>
        {
          this.props.user.queue_status === 'available' ? 
          null : 
          <button  onClick={this.onClickStopOfferingHelp} type="button" className="btn btn-secondary btn-lg btn-block">
          Stop Accepting New Requests
          </button> 
        }
        <OfferQueue />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.authentication.user,
  helperQueue: state.ihelp.helperQueue
})


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getHelperQueue,
    userStatus
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Offer)


