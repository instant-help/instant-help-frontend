import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { postQueue, objIsEmpty, deleteQueueRequest, checkIfInHelperQueue } from '../../actions/ihelp'
import  { userStatus }  from '../../actions/authentication'


class Request_Mini_Profile extends Component {
  constructor(props){
    super(props)
      this.state = {
          button: false,
          currentHelper: false,
          buttonText: "Enter Queue"
      }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user.queue_status.includes('request')){
      return { ...prevState, button: true}
    }
    // if (nextProps.user.queue_status.includes('request in queue')){
    //   if (this.props.requestInfo.helperID)
    //   return { ...prevState, button: true}
    // }
    if (nextProps.user.queue_status.includes('available')){
      return { ...prevState, button: false}
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
    if (!objIsEmpty(this.props.session) ){return alert("Request is in Session")}
    let requestID = this.props.requestInfo.id
    let requesterID = this.props.requestInfo.user_id
    console.log(requestID)
    this.props.deleteQueueRequest(requestID, requesterID)
    this.props.userStatus('put','request pending' )
    this.setState({ currentHelper: false})
  }

  onClickPostQueue = () => {
    if (this.props.user.queue_status !== 'request pending'){return alert("Make a new request")}
    let requestID = this.props.requestInfo.id
    let requesterID =this.props.requestInfo.user_id
    let helperID = this.props.helper.id
    this.props.postQueue(requestID, helperID, requesterID)
    this.props.userStatus('put','request in queue' )
    this.setState({ currentHelper: true})
  }

  currentHelper = () => {
    if (!this.state.currentHelper)
    return <a onClick={this.onClickPostQueue} className="btn btn-primary">{this.state.buttonText}</a>
    else return <a onClick={this.onClickExitQueue}  className="btn btn-secondary">Exit Queue</a>
  }

  render(){
    
    return (
      <div className='container' style={{marginBottom: '20px'}}>        
        <p className="card-text "> </p>
        <div className="card">   
          <h1 className="card-header"><span style={{marginLeft: '150px'}}>{this.props.helper.firstname}</span> {this.props.helper.lastname}</h1>
          <div className="card-body row">
            <div className='col-2 '>
            <img  className="rounded-circle " height="150" width="150" src={this.props.helper.image} />
            </div>
            <div className='col-7'>
                <h3 className="card-title">{this.props.helper.tagline}</h3>
                <h5 className="card-text">{this.props.helper.description}</h5>
            </div>
            <div className='col'>
            <div><h3>{this.props.helper.skill}</h3></div>
            <div>{this.props.helper.online} 
              { this.props.helper.online === 'online' ? 
              <span>  &  {this.props.helper.queue_status}</span> : null }
            </div>
            {
              this.state.button ? this.currentHelper() :
              null
            }
            {/* {
              !this.state.currentHelper ?  
              <a onClick={this.onClickPostQueue} className="btn btn-primary">{this.state.buttonText}</a> :
              <a onClick={this.onClickExitQueue}  className="btn btn-secondary">Exit Queue</a>
            }
             */}
            <button onClick={this.testing} className="btn btn-primary" style={{marginLeft: '30px'}} >Test</button>

            </div>
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


