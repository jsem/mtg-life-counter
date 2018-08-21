import { CLEAR_PLAYERS, CREATE_PLAYER, UPDATE_LIFE, UPDATE_POISON, UPDATE_COMMANDER_TAX, UPDATE_COMMANDER_DAMAGE, UPDATE_PLAYER } from './PlayerAction';
import { clearPlayers, createPlayer, updateLife, updatePoison, updateCommanderTax, updateCommanderDamage, updatePlayer } from './PlayerAction';

describe('PlayerAction', () => {
    it('clearPlayers action creator creates a CLEAR_PLAYERS action', () => {
        expect(
            clearPlayers()
        ).toEqual({
            type: CLEAR_PLAYERS
        })
    })

    it('createPlayer action creator creates a CREATE_PLAYER action', () => {
        expect(
            createPlayer(null, 20)
        ).toEqual({
            type: CREATE_PLAYER,
            profile: null,
            startingLife: 20
        })
    })
    
    it('updateLife action creator creates an UPDATE_LIFE action', () => {
        let playerId = '1';
        let amount = '1';
        
        expect(
            updateLife(
                playerId,
                amount
            )
        ).toEqual({
            type: UPDATE_LIFE,
            playerId: playerId,
            amount: amount
        })
    })
    
    it('updatePoison action creator creates an UPDATE_POISON action', () => {
        let playerId = '1';
        let amount = '1';
        
        expect(
            updatePoison(
                playerId,
                amount
            )
        ).toEqual({
            type: UPDATE_POISON,
            playerId: playerId,
            amount: amount
        })
    })
    
    it('updateCommanderTax action creator creates an UPDATE_COMMANDER_TAX action', () => {
        let playerId = '1';
        let amount = '1';
        
        expect(
            updateCommanderTax(
                playerId,
                amount
            )
        ).toEqual({
            type: UPDATE_COMMANDER_TAX,
            playerId: playerId,
            amount: amount
        })
    })
    
    it('updateCommanderDamage action creator creates an UPDATE_COMMANDER_DAMAGE action', () => {
        let playerId = '1';
        let opposingPlayerId = '2';
        let amount = '1';
        
        expect(
            updateCommanderDamage(
                playerId,
                opposingPlayerId,
                amount
            )
        ).toEqual({
            type: UPDATE_COMMANDER_DAMAGE,
            playerId: playerId,
            opposingPlayerId: opposingPlayerId,
            amount: amount
        })
    })

    describe('PlayerAction#updatePlayer', () => {
        let playerId = '1';
        let name = 'playerName';
        let foregroundColour = '#123';
        let backgroundColour = '#321';
        let backgroundImage = 'asdfasdfasdf';

        it('updatePlayer action creator creates an UPDATE_PLAYER action', () => {
            expect(
                updatePlayer(
                    playerId,
                    name,
                    foregroundColour,
                    backgroundColour,
                    backgroundImage
                )
            ).toEqual({
                type: UPDATE_PLAYER,
                playerId: playerId,
                values: {
                    name: name,
                    foregroundColour: foregroundColour,
                    backgroundColour: backgroundColour,
                    backgroundImage: backgroundImage
                }
            })
        })

        it('updatePlayer action creator with all values null creates an UPDATE_PLAYER action', () => {
            expect(
                updatePlayer(
                    playerId,
                    null,
                    null,
                    null,
                    null
                )
            ).toEqual({
                type: UPDATE_PLAYER,
                playerId: playerId,
                values: {}
            })
        })

        it('updatePlayer action creator with all name null creates an UPDATE_PLAYER action', () => {
            expect(
                updatePlayer(
                    playerId,
                    null,
                    foregroundColour,
                    backgroundColour,
                    backgroundImage
                )
            ).toEqual({
                type: UPDATE_PLAYER,
                playerId: playerId,
                values: {
                    foregroundColour: foregroundColour,
                    backgroundColour: backgroundColour,
                    backgroundImage: backgroundImage
                }
            })
        })

        it('updatePlayer action creator with all foregroundColor null creates an UPDATE_PLAYER action', () => {
            expect(
                updatePlayer(
                    playerId,
                    name,
                    null,
                    backgroundColour,
                    backgroundImage
                )
            ).toEqual({
                type: UPDATE_PLAYER,
                playerId: playerId,
                values: {
                    name: name,
                    backgroundColour: backgroundColour,
                    backgroundImage: backgroundImage
                }
            })
        })

        it('updatePlayer action creator with all backgroundColor null creates an UPDATE_PLAYER action', () => {
            expect(
                updatePlayer(
                    playerId,
                    name,
                    foregroundColour,
                    null,
                    backgroundImage
                )
            ).toEqual({
                type: UPDATE_PLAYER,
                playerId: playerId,
                values: {
                    name: name,
                    foregroundColour: foregroundColour,
                    backgroundImage: backgroundImage
                }
            })
        })

        it('updatePlayer action creator with all backgroundImage null creates an UPDATE_PLAYER action', () => {
            expect(
                updatePlayer(
                    playerId,
                    name,
                    foregroundColour,
                    backgroundColour,
                    null
                )
            ).toEqual({
                type: UPDATE_PLAYER,
                playerId: playerId,
                values: {
                    name: name,
                    foregroundColour: foregroundColour,
                    backgroundColour: backgroundColour
                }
            })
        })
    })
})