import React from 'react'
import "../styles/index.scss"

const ProfilePicture = props =>
  <span className="profile-container">
    <img className={`rounded-circle img-fluid profile-border ${props.isButtonImage ? 'border-2' : 'border-10'} ${props.isOnline ? 'border-online' : 'border-offline'}`} style={ props.isButtonImage && {height: "20px"}} src={props.imageUrl} />
  </span>
export default ProfilePicture