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
          <div className='container'>
          <div className="card mt-4">
            <div className="card-header btn-bg text-black primary-thin-color">
              <div className="row">
                <div className='col-12 col-lg-3 col-md-3 col-sm-12 pl-3 text-center text-md-left'>
                  <h1><span>{this.props.helperUserProfile.firstname}</span> {this.props.helperUserProfile.lastname}</h1>
                </div>
                <div className='col-12 col-lg-9 col-md-9  col-sm-12  text-center text-md-right'>
                  <h1><span className="ml-md-5">{this.props.helperUserProfile.skill}</span></h1>
                </div>
              </div>
            </div>
            <div className="card-body row ">
              <div className='col-12 col-md-3 col-sm-12 text-center'>
                <div className="row">
                  <div className='col-12 col-md-12 col-sm-6 px-sm-3 pt-sm-0 pb-sm-3 p-4'>
                    <img className="rounded-circle img-fluid" src={this.props.helperUserProfile.image} />
                  </div>
                </div>
              </div>
              <div className='col-12 col-md-8 col-sm-12 mt-3 mt-sm-0' style={{ marginLeft: '1px' }}>
                <h3 className="card-title">{this.props.helperUserProfile.tagline}</h3>
                <h5 className="card-text">{this.props.helperUserProfile.description}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className='container' style={{marginBottom: '20px'}}>        
          <div className='container'>
          <div className="card mt-4">
            <div className="card-header text-black primary-thin-color">
              <div className="row">
                <div className='col-12 col-lg-3 col-md-3 col-sm-12 pl-3 text-center text-md-left'>
                  <h1><span>{this.props.requesterUserProfile.firstname}</span> {this.props.requesterUserProfile.lastname}</h1>
                </div>
                <div className='col-12 col-lg-9 col-md-9  col-sm-12  text-center text-md-right'>
                  <h1><span className="ml-md-5">{this.props.requesterUserProfile.skill}</span></h1>
                </div>
              </div>
            </div>
            <div className="card-body row ">
              <div className='col-12 col-md-3 col-sm-12 text-center'>
                <div className="row">
                  <div className='col-12 col-md-12 col-sm-6 px-sm-3 pt-sm-0 pb-sm-3 p-4'>
                    <img className="rounded-circle img-fluid" src={this.props.requesterUserProfile.image} />
                  </div>
                </div>
              </div>
              <div className='col-12 col-md-8 col-sm-12 mt-3 mt-sm-0' style={{ marginLeft: '1px' }}>
                <h3 className="card-title">{this.props.requesterUserProfile.tagline}</h3>
                <h5 className="card-text">{this.props.requesterUserProfile.description}</h5>
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