import React, { Component } from 'react'
import Request from './Request'
import Request_Queue from './Request_Queue'

class Request_Help extends Component {

  render(){
    
    return (
      <div className="container">        
        <Request />
        <Request_Queue/>
      </div>
    )
  }
}

export default Request_Help