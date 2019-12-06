import { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import { getCurrentRequestByUserID, getRequestForUser2 } from '../actions/ihelp'

class RequestId extends Component {
  componentDidMount = async () => {
    const userStatus = this.props.user.queue_status
    if (userStatus.includes('request')) {
      this.props.getCurrentRequestByUserID()
    }
    if (userStatus.includes('offering')) {
      await this.props.getRequestForUser2()
    }
  }
  render(){
    return this.props.requestInfo.id ? this.props.children : null
  }
}

const mapStateToProps = state => ({
  requestInfo: state.ihelp.requestInfo,
  user: state.authentication.user
})

const mapDispatchToProps = dispatch => 
  bindActionCreators({
    getCurrentRequestByUserID,
    getRequestForUser2
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RequestId)