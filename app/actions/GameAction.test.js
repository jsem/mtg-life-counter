import { ADD_HISTORY, END_GAME, START_GAME } from './GameAction';
import { addHistory, endGame, startGame } from './GameAction';

describe('GameAction', () => {
    it('addHistory action creator creates an ADD_HISTORY action', () => {
        let timestamp = '1970-01-01T00:00:00+10';
        let playerId = '1';
        let note = 'This is a history note';

        expect(
            addHistory(
                timestamp,
                playerId,
                note)
        ).toEqual({
            type: ADD_HISTORY,
            timestamp: timestamp,
            playerId: playerId,
            note: note
        })
    })
    
    it('endGame action creator creates an END_GAME action', () => {
        expect(
            endGame()
        ).toEqual({
            type: END_GAME
        })
    })

    it('startGame action creator creates a START_GAME action', () => {
        let startingLife = 20;
        let numberPlayers = 2;
        let timestamp = '1970-01-01T00:00:00+10';

        expect(
            startGame(
                startingLife,
                numberPlayers,
                timestamp)
        ).toEqual({
            type: START_GAME,
            startingLife: startingLife,
            numberPlayers: numberPlayers,
            timestamp: timestamp
        })
    })
})