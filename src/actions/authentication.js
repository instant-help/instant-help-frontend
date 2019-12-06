import request from '../utils/request'
export const SET_AUTHENTICATION = 'SET_AUTHENTICATION'

export const setAuthentication = claim => ({
  type: SET_AUTHENTICATION,
  payload: claim
})

// Posts email and password to log in and receive user token for continued authorization. Also allows for callback in the parameter. 
export const logIn = function (username, password, cb) {
  return dispatch => {
    request('/auth/token','post', {
      username: username,
      password: password 
    })
    .then(response => {
      localStorage.setItem('token', response.data.token)
      dispatch(refreshUser(cb))
    })
    .catch(error => {
      console.log(error)
    })
  }
}
export const logout = function () {
  return dispatch => {
    request('/auth/token')
      .then(response => {
        return request(`/users/${response.data.id}`, 'put', { online: "offline" })
      }).then(response => {
        if(response){
          localStorage.removeItem('token')
          this.setAuthentication(null)
        }
        // dispatch(userInfo(response.data.id))
      })
  }
  // this.userStatus('put',"offline")
  // localStorage.removeItem('token')
  // this.setAuthentication(null);
}

// Signs up and creates a new user and then logs them in. 
export const createUserAccount = function (username, password) {
  return dispatch => {
      request('/users','post', {
      username: username,
      password: password 
    }).then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })
  }
}

// Requests authorization and then updates user to online status. Uses a callback parameter is provided. 
export const refreshUser = function (cb){
  return dispatch => {
    request('/auth/token')
    .then(response => {
      return request(`/users/${response.data.id}`, 'put', {online: "online"})
    }).then(response => {
      dispatch(userInfo(response.data.id))
      if(cb) cb()
    })
  }
}

// Requests authorization and then used to pick http method and update user queue status.  
export const userStatus = function (method, status) {
  return dispatch => {
    request('/auth/token')
    .then(response => {
      return request(`/users/${response.data.id}`, method, {queue_status: status})
    }).then(response => {
      dispatch(userInfo(response.data.id))
    })
  }
}

// Gets user information and sets it in redux store state. 
export const userInfo = function (userID) {
  return dispatch => {
    request(`/users/${userID}`)
    .then( response => {
      let update = response.data[0]
      dispatch(setAuthentication(update))
    })
  }
}