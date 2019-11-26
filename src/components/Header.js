import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAuthentication, userStatus } from '../actions/authentication'
class Header extends Component {

  lognInLogOutButton = () => {
    if(this.props.user) {
      localStorage.removeItem('token')
      this.props.setAuthentication(null)
      this.props.userStatus('put',"offline")
    }
    else {
      this.props.history.push('/login')
    }
  }
  
  signUpButton = () => {
    this.props.history.push('/profilenewform')
  }
  
  render(){
    return (
      
      <header className="blog-header py-3">
        {/* LEFT SIDE OF NAV BAR. */}
        <div className="row flex-nowrap justify-content-end align-items-center">
          {this.props.user ? 
            <div>
              <div >
              <span className="btn btn-sm btn-outline-secondary"  style={{marginRight: '10px'}} >{`${this.props.user.queue_status}`}</span>
              </div>
            </div> 
            : null
          }
          {/* RIGHT SIDE OF NAV BAR */}
          <div className='col'>      
            <div className="row flex-nowrap justify-content-end align-items-center"> 
              {
                this.props.user ? 
                <div >
                <span className="btn btn-sm btn-outline-secondary" onClick={()=> this.props.history.push('/profile')} style={{marginRight: '10px'}} >{this.props.user.firstname}<span> </span>{this.props.user.lastname} </span>
                </div> 
                : null
              }
              {
                this.props.user ? 
                null : 
                <div >
                  <span className="btn btn-sm btn-outline-secondary" onClick={()=>this.signUpButton()} style={{marginRight: '10px'}} >Sign Up</span>
                </div>
              }
              {
                this.props.user && this.props.user.queue_status && !this.props.user.queue_status.includes('offering') ?
                <div >
                  <span className="btn btn-sm btn-outline-secondary" onClick={()=> this.props.history.push("/requestHelp")} style={{marginRight: '10px'}} >Get Help</span>
                </div> 
                : null
              }
              {
                this.props.user && this.props.user.queue_status && !this.props.user.queue_status.includes('request') ?
                <div>
                  <span className="btn btn-sm btn-outline-secondary" onClick={()=> this.props.history.push("/offerHelp")} style={{marginRight: '10px'}} >Offer Help</span>
                </div> 
                : null
              }
              {
                this.props.user && this.props.user.queue_status && this.props.user.queue_status.includes('session')  ? 
                <div >
                <span className="btn btn-sm btn-outline-secondary" onClick={()=> this.props.history.push('/session')} style={{marginRight: '10px'}} > Session </span>
                </div> 
                : null
              }
              <div>
              <span className="btn btn-sm btn-outline-secondary" onClick={()=>this.lognInLogOutButton()}>
              {this.props.user ? 'Log Out' : 'Log In'}
              </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user,
  requestInfo: state.ihelp.requestInfo
})

const mapDispatchToProps = dispatch => 
  bindActionCreators({
    setAuthentication,
    userStatus
  }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
