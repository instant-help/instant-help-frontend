import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAuthentication, userStatus, logout } from '../actions/authentication'
import "../styles/index.scss"
import ProfilePicture from "./ProfilePicture"
class Header extends Component {

  lognInLogOutButton = () => {
    if(this.props.user) {
        this.props.logout();
        //this.props.history.push('/login')
    }
    else {
      this.props.history.push('/login')
    }
  }

  signUpButton = () => {
    this.props.history.push('/profilenewform')
  }

  componentDidUpdate = (prevProps) => {
    console.log("props in componentDid prev", prevProps);
    console.log("props in componentDid current", this.props);
  }
  
  render(){
    return (
      <header style={{  padding: '20px 25px 10px 0px'}}>
        <div className="containerNav">
          {/* LOGO*/}
          <div className='navCol1' onClick={()=> this.props.history.push('/')}>
            <div >
            <span style={{marginRight: '10px'}} className="logo" >
              <i 
              className="material-icons md-icon-size md-padding md-light" 
              // style={{padding: '7px 5px 0px 5px'}}
              > live_help</i>
              Insta Help
            </span>
            </div>
          </div> 
          {/* RIGHT SIDE OF NAV BAR */}
          <div className='navCol2'>      
            <div 
            className="row flew-nowrap justify-content-end align-items-center"
            > 
              {this.props.user ? 
                <div>
                  <div >
                  <span className={"navButton"} className="btn btn-sm btn-light" style={{marginRight: '10px'}} >{`${this.props.user.queue_status}`}</span>
                  </div>
                </div> 
                : null
              }
              {
                this.props.user ? 
                <div>
                  <span className="btn btn-sm btn-light" 
                  onClick={()=> this.props.history.push('/profile')} 
                  style={{marginRight: '10px'}} >
                    <ProfilePicture 
                    imageUrl={this.props.user.image} 
                    isButtonImage = { true }
                    isOnline = { this.props.user.online == "online" }
                    style={{ display: "inline-block"}}>
                    </ProfilePicture> 
                    <span className="pl-1">{this.props.user.firstname}</span>
                    <span> {this.props.user.lastname} </span>
                  </span>
                </div> 
                : null
              }
              {
                this.props.user ? 
                null : 
                <div >
                  <span className="btn btn-sm btn-light" onClick={()=>this.signUpButton()} style={{marginRight: '10px'}} >Sign Up</span>
                </div>
              }
              {
                this.props.user && this.props.user.queue_status && !this.props.user.queue_status.includes('offering') ?
                <div >
                  <span className="btn btn-sm btn-light" onClick={()=> this.props.history.push("/requestHelp")} style={{marginRight: '10px'}} >Get Help</span>
                </div> 
                : null
              }
              {
                this.props.user && this.props.user.queue_status && !this.props.user.queue_status.includes('request') ?
                <div>
                  <span className="btn btn-sm btn-light" onClick={()=> this.props.history.push("/offerHelp")} style={{marginRight: '10px'}} >Offer Help</span>
                </div> 
                : null
              }
              {
                this.props.user && this.props.user.queue_status && this.props.user.queue_status.includes('session')  ? 
                <div >
                <span className="btn btn-sm btn-light" onClick={()=> this.props.history.push('/session')} style={{marginRight: '10px'}} > Session </span>
                </div> 
                : null
              }
              <div>
              <span className="btn btn-sm btn-light" onClick={()=>this.lognInLogOutButton()}>
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
    userStatus,
    logout
  }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))