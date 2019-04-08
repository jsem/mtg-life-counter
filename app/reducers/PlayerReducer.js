import { CLEAR_PLAYERS, CREATE_PLAYER, UPDATE_LIFE, UPDATE_POISON, UPDATE_COMMANDER_TAX, UPDATE_COMMANDER_DAMAGE, UPDATE_CURRENT_COUNTER, UPDATE_PLAYER } from '../actions/PlayerAction';
import { DEFAULT_PROFILE } from '../config/defaultProfiles';

export const initialState = {}

/**
 * Reducer for the player state
 * @param {*} state the current state, default of initialState
 * @param {*} action the action to process. can be one of CREATE_PLAYER, UPDATE_LIFE, UPDATE_POISON, UPDATE_COMMANDER_TAX, UPDATE_COMMANDER_DAMAGE, UPDATE_CURRENT_COUNTER, or UPDATE_PLAYER
 */
export default function playerReducer(state = initialState, action) {
    switch (action.type) {
        //clear the players and reset to the initial state
        case CLEAR_PLAYERS:
            return {...initialState};
        //add a new player to the players object. Use default profile if no profile is specified
        case CREATE_PLAYER:
            var newState = { ...state };
            let profile = action.profile == null ? { ...DEFAULT_PROFILE } : { ...action.profile };
            let startingLife = action.startingLife == null ? 0 : action.startingLife;
            let playerId = Object.keys(newState).length;
            newState[playerId] = {
                playerId: playerId,
                ...DEFAULT_PROFILE,
                life: startingLife,
                poison: 0,
                commanderTax: 0,
                commanderDamage: {},
                currentCounter: 0,
                ...profile
            }
            return newState;
        //update life value of specified player. playerId cannot equal null
        case UPDATE_LIFE:
            var newState = { ...state };
            if(action.playerId == null || (action.playerId in newState) == false)  {
                return state;
            }
            newState[action.playerId].life += action.amount;
            return newState;
        //update poison value of specified player. playerId cannot equal null
        case UPDATE_POISON:
            var newState = { ...state };
            if(action.playerId == null || (action.playerId in newState) == false)  {
                return state;
            }
            newState[action.playerId].poison += action.amount;
            return newState;
        //update commander tax value of specified player. playerId cannot equal null
        case UPDATE_COMMANDER_TAX:
            var newState = { ...state };
            if(action.playerId == null || (action.playerId in newState) == false)  {
                return state;
            }
            newState[action.playerId].commanderTax += action.amount;
            return newState;
        //update commander damage value from opposing player of specified player. playerId or opposingPlayerId cannot equal null
        case UPDATE_COMMANDER_DAMAGE:
            var newState = { ...state };
            if(action.playerId == null || action.opposingPlayerId == null || (action.playerId in newState) == false || (action.opposingPlayerId in newState) == false) {
                return state;
            }
            if(newState[action.playerId].commanderDamage[action.opposingPlayerId] == null) {
                newState[action.playerId].commanderDamage[action.opposingPlayerId] = action.amount;
            } else {
                newState[action.playerId].commanderDamage[action.opposingPlayerId] += action.amount;
            }
            return newState;
        //change the current counter type selected for specified player. playerId cannot equal null
        case UPDATE_CURRENT_COUNTER:
            var newState = { ...state };
            if(action.playerId == null || (action.playerId in newState) == false)  {
                return state;
            }
            newState[action.playerId].currentCounter = action.number;
            return newState;
        //update player customisations from player menu for specified player. playerId cannot equal null
        case UPDATE_PLAYER:
            var newState = { ...state };
            if(action.playerId == null || (action.playerId in newState) == false) {
                return state;
            }
            newState[action.playerId] = {
                ...newState[action.playerId],
                ...action.values
            }
            return newState;
        //return the current state if unknown
        default:
            return state
    }
}
