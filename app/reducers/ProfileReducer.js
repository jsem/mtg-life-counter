import { CREATE_PROFILE, DELETE_PROFILE, UPDATE_PROFILE } from '../actions/ProfileAction';
import { DEFAULT_PROFILE } from '../config/defaultProfiles';

export const initialState = {
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
            let max = 0;
            for (let profileId in { ...state }) {
                max = (max < parseFloat(profileId)) ? parseFloat(profileId) : max;
            }
            var newState = { ...state };
            newState[(++max).toString()] = { ...DEFAULT_PROFILE };
            return newState;
        //remove the profile from the profiles object
        case DELETE_PROFILE:
            var newState = { ...state };
            delete newState[action.profileId];
            return newState;
        //update the profile using the values given by the action
        case UPDATE_PROFILE:
            //if provided a non-existant profile id, just return the current state
            if (state[action.profileId] == null) {
                return state;
            }
            var newState = { ...state };
            newState[action.profileId] = {
                ...newState[action.profileId],
                ...action.values
            }
            return newState;
        //return the current state if unknown
        default:
            return state
    }
}