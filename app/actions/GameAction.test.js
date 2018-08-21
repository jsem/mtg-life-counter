import { ADD_HISTORY, END_GAME, START_GAME } from './GameAction';
import { addHistory, endGame, startGame } from './GameAction';
import { CLEAR_PLAYERS, CREATE_PLAYER } from './PlayerAction';
import { colourDarkGrey, colourLightGrey } from '../config/colours';
import { DEFAULT_PROFILE } from '../config/defaultProfiles';

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
    
    it('endGame action creator creates END_GAME and CLEAR_PLAYERS actions', () => {
        expect(
            endGame()
        ).toEqual([
            {
                type: END_GAME
            },
            {
                type: CLEAR_PLAYERS
            }
        ])
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
        ).toEqual([{
            type: START_GAME,
            startingLife: startingLife,
            numberPlayers: numberPlayers,
            timestamp: timestamp
        }])
    })

    it('startGame action creator creates a START_GAME action and CREATE_PLAYER actions', () => {
        let startingLife = 20;
        let numberPlayers = 2;
        let timestamp = '1970-01-01T00:00:00+10';
        let profile1 = {...DEFAULT_PROFILE};
        let profile2 = {
            backgroundColour: colourLightGrey,
            name: 'Player2',
            foregroundColour: colourDarkGrey
        };
        let profiles = [
            profile1,
            profile2
        ];

        expect(
            startGame(
                startingLife,
                numberPlayers,
                timestamp,
                profiles)
        ).toEqual([
            {
                type: START_GAME,
                startingLife: startingLife,
                numberPlayers: numberPlayers,
                timestamp: timestamp
            },
            {
                type: CREATE_PLAYER,
                profile: profile1,
                startingLife: startingLife
            },
            {
                type: CREATE_PLAYER,
                profile: profile2,
                startingLife: startingLife
            }
        ])
    })
})