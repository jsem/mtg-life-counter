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
        // Add a new player to the players object. Use default profile if no profile is specified
        case CREATE_PLAYER:
            let newState = { ...state };
            let profile = {};
            if(action.profile == null) {
                profile = { ...DEFAULT_PROFILE };
            } else {
                profile = { ...action.profile };
            }
            newState.players[action.playerId] = {
                id: Object.keys(newState.players).length,
                name: profile.name,
                foregroundColor: profile.foregroundColor,
                backgroundColor: profile.backgroundColor,
                backgroundImage: profile.backgroundImage,
                life: 0,
                poison: 0,
                commanderTax: 0,
                commanderDamage: {}
            }
            return newState;
        // Update life value of specified player
        case UPDATE_LIFE:
            let newState = { ...state };
            newState.players[action.playerId].life += action.amount;
            return newState;
        // Update poison value of specified player
        case UPDATE_POISON:
            let newState = { ...state };
            newState.players[action.playerId].poison += action.amount;
            return newState;
        // Update commander tax value of specified player
        case UPDATE_COMMANDER_TAX:
            let newState = { ...state };
            newState.players[action.playerId].commanderTax += action.amount;
            return newState;
        // Update commander damage value from opposing player of specified player
        case UPDATE_COMMANDER_DAMAGE:
            let newState = { ...state };
            if(newState.players[action.opposingPlayerId] == null) {
                newState.players[action.opposingPlayerId] = action.amount;
            } else {
                newState.players[action.opposingPlayerId] += action.amount;
            }
            return newState;
        // Update player customisations from player menu for specified player
        case UPDATE_PLAYER:
            let newState = { ...state };
            newState.players[action.playerId].name = action.name;
            newState.players[action.playerId].foregroundColor = action.foregroundColor;
            newState.players[action.playerId].backgroundColor = action.backgroundColor;
            newState.players[action.playerId].backgroundImage = action.backgroundImage;
            return newState;
        //return the current state if unknown
        default:
            return state
    }
}