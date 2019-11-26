import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRequesterProfileByRequestId, getHelperIdFromQueue  } from '../../actions/ihelp'
import { bindActionCreators } from 'redux'

class SessionConnectionProfiles extends Component {
  componentDidMount(){
    this.props.getRequesterProfileByRequestId()
    this.props.getHelperIdFromQueue()
  }
  render(){
    return (
<div>
  <div className='container' style={{marginBottom: '20px'}}>
  <p className="card-text "></p>
    <div className="card">   
      <h1 className="card-header">
        <span style={{marginLeft: '150px'}}>
        {
          this.props.helperUserProfile.firstname
        }
        </span> 
        {
          this.props.helperUserProfile.lastname
        }
      </h1>
      <div className="card-body row">
        <div className='col-2 '>
        <img   className="rounded-circle " height="150" width="150" src={this.props.helperUserProfile.image} />
        </div>
        <div className='col-7' style={{marginLeft: '1px'}}>
          <h3 className="card-title">{this.props.helperUserProfile.tagline}</h3>
          <h5 className="card-text">{this.props.helperUserProfile.description}</h5>
        </div>
        <div className='col'>
          <div><h3>{this.props.helperUserProfile.skill}</h3></div>
          <div>
          {
            this.props.helperUserProfile.online
          } 
          { 
            this.props.helperUserProfile.online === 'online' ? 
            <span> & {this.props.helperUserProfile.queue_status}</span> : 
            null 
          }
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* ////////////////////////////////////////////// */}
  <div className='container' style={{marginBottom: '20px'}}>
  <p className="card-text "> </p>
    <div className="card">   
      <h1 className="card-header">
        <span style={{marginLeft: '150px'}}>{this.props.requesterUserProfile.firstname}</span>
        {this.props.requesterUserProfile.lastname}
      </h1>
      <div className="card-body row">
        <div className='col-2 '>
          <img   className="rounded-circle " height="150" width="150" src={this.props.requesterUserProfile.image} />
        </div>
        <div className='col-7' style={{marginLeft: '1px'}}>
          <h3 className="card-title">{this.props.requesterUserProfile.tagline}</h3>
          <h5 className="card-text">{this.props.requesterUserProfile.description}</h5>
        </div>
        <div className='col'>
          <div><h3>{this.props.requesterUserProfile.skill}</h3></div>
          <div>{this.props.requesterUserProfile.online} 
            { this.props.requesterUserProfile.online === 'online' ? 
              <span>  &  {this.props.requesterUserProfile.queue_status}</span> : 
              null 
            }
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
  helperUserProfile: state.ihelp.helperUserProfile,
  requesterUserProfile: state.ihelp.requesterUserProfile
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getHelperIdFromQueue,
    getRequesterProfileByRequestId,
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SessionConnectionProfiles)

