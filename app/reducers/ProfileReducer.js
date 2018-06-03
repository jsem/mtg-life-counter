import { CREATE_PROFILE } from '../actions/ProfileAction';
import { DELETE_PROFILE } from '../actions/ProfileAction';
import { UPDATE_PROFILE } from '../actions/ProfileAction';
import { DEFAULT_PROFILE } from '../config/defaultProfiles';

const initialState = {
    profiles: {}
}

/**
 * Reducer for the profile state
 * @param {*} state the current state, default of initialState
 * @param {*} action the action to process. can be one of CREATE_PROFILE, DELETE_PROFILE, or UPDATE_PROFILE
 */
export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        //add the new profile to the profiles object, using the default profile
        case CREATE_PROFILE:
            let newState = { ...state };
            newState.profiles[action.profileId] = { ...DEFAULT_PROFILE };
            return newState;
        //remove the profile from the profiles object
        case DELETE_PROFILE:
            let newState = { ...state };
            delete newState.profiles[action.profileId];
            return newState;
        //update the profile using the values given by the action
        case UPDATE_PROFILE:
            let newState = { ...state };
            newState.profiles[action.profileId] = {
                ...newState.profiles[action.profileId],
                ...action.values
            }
            return newState;
        //return the current state if unknown
        default:
            return state
    }
}