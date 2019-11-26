import request from '../utils/request'
import { refreshUser } from './authentication'


export const GET_OFFERINGHELP = 'GET_OFFERINGHELP'
export const GET_REQUEST = 'GET_REQUEST'
export const GET_SESSION = 'GET_SESSION'
export const GET_HELPERQUEUE = 'GET_HELPERQUEUE'
export const GET_REQUESTERPROFILE = 'GET_REQUESTERPROFILE'
export const GET_HELPERPROFILE = 'GET_HELPERPROFILE'


// Runs all the functions needed to Start a Session for USER 2. 
export const startSession =  function (queue_id, request_id, requesterUserId, helperUserId, cb) {
  return async (dispatch) => {
    dispatch(await createSession(queue_id, request_id, requesterUserId, helperUserId ))
    dispatch(await updateUserQueueStatus(requesterUserId, 'request in session')) 
    dispatch(await updateUserQueueStatus(helperUserId, 'offering help in session'))
    dispatch(await updateRequestStatus(request_id, 'in session'))
    dispatch(await refreshUser())
    dispatch(await setHelperProfile(helperUserId))
    dispatch(await setRequesterProfile(requesterUserId))
    dispatch(await go(cb))
  }
}

const go = (cb) => {
  return (dispatch) => {
    dispatch({
      type: 'GO'
    })
    cb() 
  }
}

// POST creates session, starts requested session, updates helpers user.queue_status and requester user.queue_status
// Question so I thought the .then was a way of chaining my functions to execute after the Session posted. Then the other 
// functions would start dispatching in order once after another within the startSession and its child function
// createSession with createSession's child functions that also executing in order with once the createSession's functions 
// finish then the then function updateRequestStatus which is after createSession but a child of startSession with then execute 
// sycronously. That doesnt seem to be the case. So now I will create some new tests. 
// test 1. create a new startSessions that flattens every function and API request. 
// test 2 create a back end path that takes all 4 variables and makes all nessasary changes and then returns the resulst 
// to be then set. 
export const createSession = function (queue_id, request_id, requesterUserId, helperUserId ){
  return dispatch => {
    // this creates the session i need
    console.log('queue_id', queue_id, 'request_id', request_id, 'requesterUserId', requesterUserId, 'helperUserId', helperUserId)
    request(`/sessions`, 'post', {
      request_id: request_id,
      queue_id: queue_id
    })
    .then( response => {
    //   // this updates the requester and helpers queue status in their user profiles. 
    //   // dispatch(updateUserQueueStatus(requesterUserId, 'request in session')) 
    //   // dispatch(updateUserQueueStatus(helperUserId, 'offering help in session'))
    //   // // this get Helper Queue is not needed anymore. 
    //   // dispatch(getHelperQueue(helperUserId))
    //   // // this pulls up the active session by request id and sets the active session. It does not seem to be needed anymore. 
    //   // dispatch(getActiveSessionInfo(request_id))
    })
  }
}

// Gets and Sets active session information for the users. 
export const getActiveSessionInfo = function (){
  return async (dispatch, getStore) => {
    const { ihelp: { requestInfo } } = getStore()
    try {
      const response = await request(`/sessions/active/${requestInfo.id}`)
      dispatch({type: GET_SESSION, payload: response.data})
      console.log('getActiveSessionInfo',response.data)
    }
    catch(e){
      console.log(e)
    }
  }
}

// setSTATE() this populate the offer help queue with help requests users
export const getHelperQueue = function () {
  return (dispatch, getStore ) => {
    const { authentication: { user } } = getStore()
    request(`/queues/allqueueprofiles/${user.id}`)
    .then(response => {
      dispatch({type: GET_HELPERQUEUE, payload: response.data})
      console.log('getHelperQueue',response.data)
    })
    .catch(console.error)
  }
}

// I am having problems getting this code to work to return a boolean answer properly when I embed the function into
// component did mount and use that to set the button status on IhelpGetQueueMiniProfile.
export const checkIfInHelperQueue = function (requestID, HelperID) {
  return dispatch => {
  console.log('1 working')
    request(`/queues/allqueueprofiles/${HelperID}`)
    .then(response => {
      console.log('2 checkIfInHelperQueue',response.data)
      const helperQueue = response.data
      console.log(3, helperQueue)
      const inQueue = helperQueue.filter( queue => queue.request_id === requestID ) 
      console.log('4 current', inQueue.length)
      console.log('WORKING MORE')
      return true
    })
  }   
}

// setSTATE() this populates the get help area with user offering help
export const helpersProfiles = function (){
  return dispatch => {
    request('/users/offeringhelp')
    .then(response => {
      dispatch({type: GET_OFFERINGHELP, payload: response.data})
      console.log('helpersProfiles', response.data)
    })
  }
}

// setSTATE() this takes a requesters user id and looks for a current request and sets it to state.
export const getCurrentRequestByUserID = function (){
  return (dispatch, getStore) => {
    const { authentication: { user } } = getStore()
    request(`/requests/current/${user.id}`)
    .then(response => {
      dispatch({type: GET_REQUEST, payload: response.data[0]})
      console.log('getCurrentRequestByUserID',response.data[0])
    })
  }
}

// uses request id to set requst info
export const setRequestByRequestID = function (request_id){
  return (dispatch) => {
    request(`/requests/${request_id}`)
    .then(response => {
      dispatch({type: GET_REQUEST, payload: response.data[0]})
      console.log('getCurrentRequestByUserID',response.data[0])
    })
  }
}

export const getRequestForUser2 = function () {
  return (dispatch, getStore) => {
    const { authentication: { user } } = getStore()
    request(`/queues/helpersSessionFromQueue/${user.id}`)
    .then(response => {
      console.log(response.data.id,'11111111111111')
      dispatch(setRequestByRequestID(response.data.id))
    })
  }
}

// / setSTATE() this takes a requesters user id and looks for a current request and sets it to state.
export const getCurrentRequestByRequesterID = function (requsterUserID){
  
  return (dispatch) => {
    request(`/requests/current/${requsterUserID}`)
    .then(response => {
      dispatch({type: GET_REQUEST, payload: response.data[0]})
      console.log('THE REQUEST INFOMATION',response.data[0])
    })
  }
}

// this changes a users profile queue status
export const updateUserQueueStatus = function (userID, status){
  return dispatch => {
    request(`/users/${userID}`, 'put', {
      queue_status: status
    }).then(response => {
      console.log('updateUserQueueStatus',response.data)
    })
  }
}



// Deletes a request from the queue and returns request and user queue status to pending
export const deleteQueueRequest = function (requestID, requesterID){
  return dispatch => {
    request(`/queues/${requestID}`, 'delete')
    .then(response => {
      console.log('Deleted Queue Request', response.data)
    }) 
    request(`/requests/${requestID}`, 'put', {
      request_status: 'pending'
    })
    request(`/users/${requesterID}`, 'put', {
      queue_status: 'request pending'
    })
  }
}

// Used to post a new request and then gets that request
export const postRequest = function ( requestDescription){
  return (dispatch, getStore) => {
    const { authentication: { user } } = getStore()
    request(`/requests/${user.id}`, 'post', {
      description: requestDescription
    }).then( response => {
      dispatch(getCurrentRequestByUserID())
      console.log('THE REQUEST INFOMATION',response.data[0])
    })
  }
}

// POST request in queue, updates request_status, and updates user.queue_status
export const postQueue = function (requestID, helperID, requesterID) {
  return dispatch => {
    request('/queues', 'post', {
      helper_id: helperID, 
      request_id: requestID
    })
    .then(response => {
      console.log('postQueue', response.data)
    })
    request(`/requests/${requestID}`, 'put', {
      request_status: 'in queue'
    })
    request(`/users/${requesterID}`, 'put', {
      queue_status: 'request in queue'
    })
  }
}

// Closes a help request, and remove removes request from queue
export const closeHelpRequest = function (requestID, requesterID, helperID ){
  return (dispatch, getStore) => {
    const { ihelp: { requestInfo } } = getStore()
    request(`/requests/${requestInfo.id}`, 'put', {
      request_status: 'closed'
    }).then( response => {
      console.log('Request Closed', response.data)
    })
    request(`/queues/${requestInfo.user_id}`, 'delete')
    .then(response => {
      console.log('Deleted Queue Request', response.data)
    })
  } 
} 

// helpful for testing if an object is empty
export const objIsEmpty = function (obj){
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

export const getRequesterProfileByRequestId = function (){
  return (dispatch, getStore) => {
    try {
    const { ihelp: { requestInfo } } = getStore()
    request(`/requests/${requestInfo.id}`)
    .then( response => {
      console.log(response.data[0].user_id)
      dispatch(setRequesterProfile(response.data[0].user_id))
    })}
    catch(e){
      console.log(e)
    }
  }
}

export const setRequesterProfile = function (userID) {
  return dispatch => {
    request(`/users/${userID}`)
    .then( response => {
      dispatch({type: GET_REQUESTERPROFILE, payload: response.data[0]})
      console.log('UPDATED REQUESTER INFOMATION',response.data[0])
    })
  }
}

export const getHelperIdFromQueue = function (){
  return (dispatch, getStore) => {
    try {
    const { ihelp: { requestInfo } } = getStore()
      request(`/queues/request/${requestInfo.id}`)
      .then( response => {
        if(response.data[0] === undefined) {return}
        console.log(response.data[0].helper_id)
        dispatch(setHelperProfile(response.data[0].helper_id))
      })}
      catch(e){
        console.log(e)
      }
  }
}

export const setHelperProfile = function (helperID) {
  return dispatch => {
    request(`/users/${helperID}`)
    .then( response => {
      dispatch({type: GET_HELPERPROFILE, payload: response.data[0]})
      console.log('UPDATED HELPER INFOMATION', response.data[0])
    })
  }
}

export const updateSessionStatus = function (requestID, status) {
  return dispath => {
    request(`/sessions/${requestID}`, 'put', {
      session_status: status
    }).then( response => {
      console.log('updateSessionStatus', response.data)
    })
  }
}

export const updateRequestStatus = function (requestID, status) {
  return dispath => {
    request(`/requests/${requestID}`, 'put', {
      request_status: status
    }).then( response => {
      console.log('updateRequestStatus', response.data)
    })
  }
}

export const deleteRequestFromQueue = function (requestID){
  return dispatch => {
    request(`/queues/${requestID}`, 'delete')
    .then(response => {
      console.log('deleteRequestFromQueue', response.data)
    })
  }
}

