import { CREATE_PLAYER } from '../actions/PlayerAction';
import { UPDATE_LIFE } from '../actions/PlayerAction';
import { UPDATE_POISON } from '../actions/PlayerAction';
import { UPDATE_COMMANDER_TAX } from '../actions/PlayerAction';
import { UPDATE_COMMANDER_DAMAGE } from '../actions/PlayerAction';
import { UPDATE_PLAYER } from '../actions/PlayerAction';
import { DEFAULT_PROFILE } from '../config/defaultProfiles';

const initialState = {
    players: {}
}

/**
 * Reducer for the player state
 * @param {*} state the current state, default of initialState
 * @param {*} action the action to process. can be one of CREATE_PLAYER, UPDATE_LIFE, UPDATE_POISON, UPDATE_COMMANDER_TAX, UPDATE_COMMANDER_DAMAGE, or UPDATE_PLAYER
 */
export default function playerReducer(state = initialState, action) {
    switch (action.type) {
        //add a new player to the players object. Use default profile if no profile is specified
        case CREATE_PLAYER:
            let newState = { ...state };
            let profile = action.profile == null ? { ...DEFAULT_PROFILE } : { ...action.profile };
            playerId = Object.keys(newState.players).length;
            newState.players[playerId] = {
                id: playerId,
                ...profile,
                life: action.startingLife,
                poison: 0,
                commanderTax: 0,
                commanderDamage: {}
            }
            return newState;
        //update life value of specified player
        case UPDATE_LIFE:
            let newState = { ...state };
            newState.players[action.playerId].life += action.amount;
            return newState;
        //update poison value of specified player
        case UPDATE_POISON:
            let newState = { ...state };
            newState.players[action.playerId].poison += action.amount;
            return newState;
        //update commander tax value of specified player
        case UPDATE_COMMANDER_TAX:
            let newState = { ...state };
            newState.players[action.playerId].commanderTax += action.amount;
            return newState;
        //update commander damage value from opposing player of specified player
        case UPDATE_COMMANDER_DAMAGE:
            let newState = { ...state };
            if(newState.players[action.opposingPlayerId] == null) {
                newState.players[action.opposingPlayerId] = action.amount;
            } else {
                newState.players[action.opposingPlayerId] += action.amount;
            }
            return newState;
        //update player customisations from player menu for specified player
        case UPDATE_PLAYER:
            let newState = { ...state };
            newState.players[action.playerId] = {
                ...action.values
            }
            return newState;
        //return the current state if unknown
        default:
            return state
    }
}