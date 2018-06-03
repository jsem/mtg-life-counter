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
 * Create an END_GAME action
 */
export function endGame() {
    return {
        type: END_GAME
    }
}

/**
 * Create a START_GAME action
 * @param {*} startingLife the starting life totals
 * @param {*} numberPlayers the number of players in the game
 * @param {*} timestamp the timetamp when the game started
 */
export function startGame(startingLife, numberPlayers, timestamp) {
    return {
        type: START_GAME,
        startingLife: startingLife,
        numberPlayers: numberPlayers,
        timestamp: timestamp
    }
}