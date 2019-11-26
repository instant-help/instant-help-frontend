import React, { Component } from 'react'
import Request_Mini_Profile from './Request_Mini_Profile'
import { helpersProfiles } from '../../actions/ihelp'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { refreshUser } from '../../actions/authentication'

class Request_Queue extends Component {

  componentDidMount(){
    this.props.refreshUser()
    this.props.helpersProfiles()
  }

  render(){
    return (
      <div>
        <div style={{marginTop: '10px'}}>
          <div className="card" >
          { this.props.offeringHelp.length !== 0 ? this.props.offeringHelp.map( user => {
              return <Request_Mini_Profile key={user.id} helper={user}/>
            }) : 
            
            <div className='container' style={{marginBottom: '20px'}}>        
              <p className="card-text "> </p>
              <div className="card">   
                <h1 className="card-header"><span style={{marginLeft: '20px'}}>No Help Is Currently Available </span></h1>
              </div>
            </div>
          }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  offeringHelp: state.ihelp.offeringHelp
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    helpersProfiles,
    refreshUser
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Request_Queue)


