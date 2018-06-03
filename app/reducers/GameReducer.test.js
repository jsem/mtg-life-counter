import gameReducer, { initialState } from './GameReducer';
import { addHistory, endGame, startGame } from '../actions/GameAction';
import { NOTE_START_GAME } from '../config/notes';

describe('gameReducer', () => {
    it ('should return the initial state', () => {
        expect(
            gameReducer(undefined, {})
        ).toEqual(
            initialState
        )
    })

    describe ('gameReducer#ADD_HISTORY', () => {
        let timestamp1 = '1970-01-01T00:00:00+10';
        let timestamp2 = '2000-10-10T11:11:11+10';
        let playerId1 = '1';
        let playerId2 = '2';
        let note1 = 'This is a history note';
        let note2 = 'This is an alternate history note';

        it('adds new history to empty array', () => {
            expect(
                gameReducer(
                    undefined,
                    addHistory(timestamp1, playerId1, note1)
                )
            ).toEqual({
                ...initialState,
                history: [
                    {
                        timestamp: timestamp1,
                        playerId: playerId1,
                        note: note1
                    }
                ]
            })
        })

        it('append new history to existing array', () => {
            expect(
                gameReducer(
                    gameReducer(
                        undefined,
                        addHistory(timestamp1, playerId1, note1)
                    ),
                    addHistory(timestamp2, playerId2, note2)
                )
            ).toEqual({
                ...initialState,
                history: [
                    {
                        timestamp: timestamp1,
                        playerId: playerId1,
                        note: note1
                    },
                    {
                        timestamp: timestamp2,
                        playerId: playerId2,
                        note: note2
                    }
                ]
            })
        })

        it('accepts new history with undefined playerId', () => {
            expect(
                gameReducer(
                    undefined,
                    addHistory(timestamp1, undefined, note1)
                )
            ).toEqual({
                ...initialState,
                history: [
                    {
                        timestamp: timestamp1,
                        note: note1
                    }
                ]
            })
        })
    })

    describe ('gameReducer#END_GAME', () => {
        let numberPlayers = 2;
        let startingLife = 20;
        let timestamp = '1970-01-01T00:00:00+10';
        let playerId = '1';
        let note = 'This is a history note';

        it('returns the initial state', () => {
            expect(
                gameReducer(
                    gameReducer(
                        gameReducer(
                            undefined,
                            startGame(startingLife, numberPlayers, timestamp)
                        ),
                        addHistory(timestamp, playerId, note)
                    ),
                    endGame()
                )
            ).toEqual(
                initialState
            )
        })
    })

    describe ('gameReducer#START_GAME', () => {
        let numberPlayers = 3;
        let numberPlayers2 = 4;
        let startingLife = 30;
        let startingLife2 = 40;
        let startTime = '1970-01-01T00:00:00+10';
        let startTime2 = '2000-11-11T11:11:11+10';

        it('sets up the game state', () => {
            expect(
                gameReducer(
                    undefined,
                    startGame(startingLife, numberPlayers, startTime)
                )
            ).toEqual({
                numberPlayers: numberPlayers,
                startingLife: startingLife,
                startTime: startTime,
                history: [
                    {
                        timestamp: startTime,
                        note: NOTE_START_GAME
                    }
                ]
            })
        })

        it('resets the game state if called twice', () => {
            expect(
                gameReducer(
                    gameReducer(
                        undefined,
                        startGame(startingLife, numberPlayers, startTime)
                    ),
                    startGame(startingLife2, numberPlayers2, startTime2)
                )
            ).toEqual({
                numberPlayers: numberPlayers2,
                startingLife: startingLife2,
                startTime: startTime2,
                history: [
                    {
                        timestamp: startTime2,
                        note: NOTE_START_GAME
                    }
                ]
            })
        })
    })
})