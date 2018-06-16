import { clearPlayers, createPlayer } from "./PlayerAction";

export const ADD_HISTORY = 'ADD_HISTORY';
export const END_GAME = 'END_GAME';
export const START_GAME = 'START_GAME';

/**
 * Create an ADD_HISTORY action
 * @param {*} timestamp the timestamp the event occurred
 * @param {*} playerId the id of the player the action relates to (nullable)
 * @param {*} note describes the event that occurred
 */
export function addHistory(timestamp, playerId, note) {
    return {
        type: ADD_HISTORY,
        timestamp: timestamp,
        playerId: playerId,
        note: note
    }
}

/**
 * Create an END_GAME and a CLEAR_PLAYERS action
 */
export function endGame() {
    return [
        {
            type: END_GAME
        },
        clearPlayers()
    ]
}

/**
 * Create a START_GAME action, and CREATE_PLAYER actions for each profile passed through
 * @param {*} startingLife the starting life totals
 * @param {*} numberPlayers the number of players in the game
 * @param {*} timestamp the timetamp when the game started
 * @param {*} profiles the profiles for each player
 */
export function startGame(startingLife, numberPlayers, timestamp, profiles = []) {
    let actions = [
        {
            type: START_GAME,
            startingLife: startingLife,
            numberPlayers: numberPlayers,
            timestamp: timestamp
        }
    ];
    profiles.map(profile => {
        actions.push(createPlayer(profile, startingLife))
    })
    return actions;
}