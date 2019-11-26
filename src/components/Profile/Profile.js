import React, { Component } from 'react'
import { connect } from 'react-redux'
import { refreshUser } from '../../actions/authentication'
import { bindActionCreators } from 'redux'

class Profile extends Component {
  
  componentDidMount(){
    this.props.refreshUser()
  }

  render(){
    
    return (
      <div className='container'>
        <p className="card-text "> </p>
        <div className="card">   
          <h1 className="card-header"><span style={{marginLeft: '150px'}}>{this.props.user.firstname}</span> {this.props.user.lastname}</h1>
          <div className="card-body row">
            <div className='col-2 '>
            <img   className="rounded-circle " height="150" width="150" src={this.props.user.image} />
            </div>
            <div className='col-7' style={{marginLeft: '1px'}}>
              <h3 className="card-title">{this.props.user.tagline}</h3>
              <h5 className="card-text">{this.props.user.description}</h5>
            </div>
            <div className='col'>
            <div>
              <h3>{this.props.user.skill}</h3>
            </div>
            <a href="#" className="btn btn-primary">Update Profile</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    refreshUser
  }, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
