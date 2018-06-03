import { ADD_HISTORY, END_GAME, START_GAME } from '../actions/GameAction';
import { NOTE_START_GAME } from '../config/notes';

export const initialState = {
    numberPlayers: 2,
    startingLife: 20,
    startTime: "",
    history: []
}

/**
 * Reducer for the game state
 * @param {*} state the current state, default of initialState
 * @param {*} action the action to process. can be one of ADD_HISTORY, END_GAME, or START_GAME
 */
export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        //add a new history item to the history array
        case ADD_HISTORY:
            return {
                ...state,
                history: [
                    ...state.history,
                    {
                        timestamp: action.timestamp,
                        playerId: action.playerId,
                        note: action.note
                    }
                ]
            }
        //end the game and reset to the initial state
        case END_GAME:
            return {
                ...initialState
            }
        //start a new game, setting up all values and adding the start game note to the history
        case START_GAME:
            return {
                numberPlayers: action.numberPlayers,
                startingLife: action.startingLife,
                startTime: action.timestamp,
                history: [
                    {
                        timestamp: action.timestamp,
                        note: NOTE_START_GAME
                    }
                ]
            }
        //return the current state if unknown
        default:
            return state
    }
}