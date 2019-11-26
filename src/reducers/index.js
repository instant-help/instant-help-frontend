import { SET_AUTHENTICATION } from '../actions/authentication'
import { GET_REQUEST, GET_HELPERQUEUE, GET_SESSION, GET_OFFERINGHELP, GET_HELPERPROFILE, GET_REQUESTERPROFILE } from '../actions/ihelp'

const IHELP_INITIAL_STATE = {
  requestInfo: {},
  offeringHelp: [],
  helperQueue: [],
  session: {},
  helperUserProfile: {},
  requesterUserProfile: {}
}

export const ihelp = (state=IHELP_INITIAL_STATE, action) => {
  switch(action.type){
    case GET_OFFERINGHELP:
      return {...state, offeringHelp: action.payload}
    case GET_REQUEST:
      return {...state, requestInfo: action.payload }
    case GET_HELPERQUEUE:
      return {...state, helperQueue: action.payload}
    case GET_SESSION:
      return {...state, session: action.payload}
    case GET_REQUESTERPROFILE:
      return {...state, requesterUserProfile: action.payload}
    case GET_HELPERPROFILE:
      return {...state, helperUserProfile: action.payload}
    default:
      return state
  }
} 

const AUTHENTICATION_INITIAL_STATE = {
  user: null,
  pending: true
}

export const authentication = (state = AUTHENTICATION_INITIAL_STATE, action) => {
  switch(action.type){
    case SET_AUTHENTICATION: 
      return {user: action.payload, pending: false}
    default:
      return state
  }
}