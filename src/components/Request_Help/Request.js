import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import  { connect }  from 'react-redux'
import  { userStatus }  from '../../actions/authentication'
import  { postRequest, getCurrentRequestByUserID, closeHelpRequest, helpersProfiles }  from '../../actions/ihelp'

class Request extends Component {
  constructor(props){
    super(props)
      this.state = {
        request: ""
      }
  }

  componentDidMount(){
    this.props.getCurrentRequestByUserID()
  }

  onSubmitRequest = (e) => {
    this.props.helpersProfiles()
    e.preventDefault()
    if (this.props.user.queue_status === 'available'){
      this.props.userStatus('put',"request pending")
      const requestDescription = this.state.request
      this.props.postRequest(requestDescription)
      this.setState({request: requestDescription})
    }  else {
        alert("You alreay have a pending request")
  }
}

  closeRequest = () => {
    this.props.helpersProfiles()
    if (this.props.user.queue_status === 'request in queue'){ 
      alert('Exit queue to close your current request')
    } else {
    this.props.closeHelpRequest()
    this.props.getCurrentRequestByUserID()
    this.props.userStatus('put',"available")
    alert("Your request is canceled")
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

 
  

  render(){
    
    return (
      <div>
        <div style={{marginTop: '10px'}}>
          <div className="card">
            <div className="card-header text-black">
              <div>
                <form onSubmit={this.onSubmitRequest}>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Enter Your Request Description</label>
                    <textarea name='request'
                      placeholder={ this.props.requestInfo ? this.props.requestInfo.description : "Write request here"}
                      className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={ this.onChange } required>
                    </textarea>
                  </div>
                  <button type="submit" className="btn btn-warning">{ this.props.user.queue_status !== 'available' ? this.props.user.queue_status.toUpperCase()  : 'Submit Request' }</button>
                  {
                    (this.props.user.queue_status === 'request in queue' || this.props.user.queue_status === 'request pending' ) 
                    ? <a onClick={this.closeRequest}style={{marginLeft: '10px'}} className="btn btn-danger">Close Request </a> 
                    : null
                  }
                </form>
              </div>
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
    postRequest,
    userStatus,
    closeHelpRequest,
    getCurrentRequestByUserID,
    helpersProfiles
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Request)

