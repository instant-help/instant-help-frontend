import React from 'react'
import "../styles/index.scss"

const Home = props =>
  <div className="container">
    <div className="row py-4">
      <div className="col-12 text-center">
        <h1 className="">Need Instant help from a Developer?</h1>
        <p>
          Insta Help is a community of developers that are online and instantly available to help.
        </p>
      </div>
    </div>
    <div className="row">
      <div className="col-12 text-center">
        <img src="https://cdn.givingcompass.org/wp-content/uploads/2019/03/26130148/Meet-the-People-Coding-Our-World.jpg" className="img-fluid"></img>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-11 py-2">
        <h2>Sign up and Join our community.</h2>
        <p>
          Step 1: Join by creating a profile and share about your developer experiance and background.<br></br>
          Step 2: If you need help simply cluck on [Get Help] describe the help you need and submit is.Then click [Enter Queue] for an available developer. When the developer is ready they will start a Help Session with you.<br></br>  
          Step 3: If you want to offer help click on [Offer Help] and then [Start Offering Help]. Once a develoer enters your queue simply click [Start Session].
          Step 4: When the session starts us the Google Hangout plugin to communicate and screen share. 
          Step 5: When the session is complete simply click on [End Session].
        </p>
      </div>
    </div>
  </div>

export default Home