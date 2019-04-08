import playerReducer, { initialState } from './PlayerReducer';
import { endGame, startGame } from '../actions/GameAction';
import { clearPlayers, createPlayer, updateLife, updatePoison, updateCommanderTax, updateCommanderDamage, updatePlayer, updateCurrentCounter } from '../actions/PlayerAction';
import { DEFAULT_PROFILE } from '../config/defaultProfiles';
import { colourDarkGrey, colourLightGrey } from '../config/colours';

describe('playerReducer', () => {
    it ('should return the initial state', () => {
        expect(
            playerReducer(undefined, {})
        ).toEqual(
            initialState
        )
    })

    describe ('playerReducer#CLEAR_PLAYERS', () => {
        it ('resets the state back to the initial value', () => {
            expect(
                playerReducer(
                    playerReducer(
                        playerReducer(
                            undefined,
                            createPlayer(null, null)
                        ),
                        createPlayer(null, null)
                    ),
                    clearPlayers()
                )
            ).toEqual({
                ...initialState
            })
        })

        it ('receives a CLEAR_PLAYERS action when using the endGame action creator', () => {
            let state = playerReducer(
                playerReducer(
                    undefined,
                    createPlayer(null, null)
                ),
                createPlayer(null, null)
            );
            endGame().map(action =>
                state = playerReducer(
                    state,
                    action
                )

            );
            expect(
                state
            ).toEqual({
                ...initialState
            })
        })
    })

    describe ('playerReducer#CREATE_PLAYER', () => {
        it('creates a new player', () => {
            expect(
                playerReducer(
                    undefined,
                    createPlayer(null, null)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('creates a new player with a not null profile passed and null startingLife', () => {
            let profile = {
                name:'playerName',
                foregroundColour:'#123',
                backgroundColour:'#321',
                backgroundImage:'asdfasdfasdf'
            }
            expect(
                playerReducer(
                    undefined,
                    createPlayer(profile, null)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...profile,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('creates a new player with a null profile passed and not null startingLife', () => {
            let startingLife = 20;
            expect(
                playerReducer(
                    undefined,
                    createPlayer(null, startingLife)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 20,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('creates a new player with a not null profile passed and not null startingLife', () => {
            let profile = {
                name:'playerName',
                foregroundColour:'#123',
                backgroundColour:'#321',
                backgroundImage:'asdfasdfasdf'
            }
            let startingLife = 20;
            expect(
                playerReducer(
                    undefined,
                    createPlayer(profile, startingLife)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...profile,
                    life: 20,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('creates a new player with an incomplete profile passed and not null startingLife', () => {
            let profile = {
                name:'playerName',
                backgroundColour:'#321',
                backgroundImage:'asdfasdfasdf'
            }
            let startingLife = 20;
            expect(
                playerReducer(
                    undefined,
                    createPlayer(profile, startingLife)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    name: profile.name,
                    foregroundColour: DEFAULT_PROFILE.foregroundColour,
                    backgroundColour: profile.backgroundColour,
                    backgroundImage: profile.backgroundImage,
                    life: 20,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('startGame action creator also creates 2 CREATE_PLAYER actions', () => {
            let numberPlayers = 2;
            let startingLife = 20;
            let startTime = '1970-01-01T00:00:00+10';
            let profile1 = {...DEFAULT_PROFILE};
            let profile2 = {
                backgroundColour: colourLightGrey,
                name: 'Name',
                foregroundColour: colourDarkGrey
            };
            let profiles = [
                profile1,
                profile2
            ];
            let state = undefined;
            startGame(startingLife, numberPlayers, startTime, profiles).map(action =>
                state = playerReducer(
                    state,
                    action
                )
            )
            expect(
                state
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...profile1,
                    life: 20,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                },
                '1': {
                    playerId: 1,
                    ...profile2,
                    life: 20,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })
    })

    describe ('playerReducer#UPDATE_LIFE', () => {
        it('create a player and increase life by 1', () => {
            let playerId = 0;
            let life = 1;

            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updateLife(playerId, life)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 1,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('returns state if null playerId is passed', () => {
            let playerId = null;
            let life = 1;

            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updateLife(playerId, life)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('Does not change life if null life is passed', () => {
            let playerId = 0;
            let startingLife = 20;
            let life = null;

            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, 20)
                    ),
                    updateLife(playerId, life)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: startingLife,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('returns state if a non-existant playerId is passed', () => {
            let playerId = 1;
            let startingLife = 20;
            let life = 1;

            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, 20)
                    ),
                    updateLife(playerId, life)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: startingLife,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })
    })

    describe ('playerReducer#UPDATE_POISON', () => {
        it('create a player and increase poison by 1', () => {
            let playerId = 0;
            let poison = 1;

            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updatePoison(playerId, poison)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 1,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('returns state if null playerId is passed', () => {
            let playerId = null;
            let poison = 1;

            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updatePoison(playerId, poison)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('Does not change poison if null poison is passed', () => {
            let playerId = 0;
            let poison1 = 1;
            let poison2 = null;

            expect(
                playerReducer(
                    playerReducer(
                        playerReducer(
                            undefined,
                            createPlayer(null, null)
                        ),
                        updatePoison(playerId, poison1)
                    ),
                    updatePoison(playerId, poison2)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 1,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('returns state if a non-existant playerId is passed', () => {
            let playerId = 1;
            let poison = 1;

            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updateLife(playerId, poison)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })
    })

    describe ('playerReducer#UPDATE_COMMANDER_TAX', () => {
        it('create a player and increase commander tax by 1', () => {
            let playerId = 0;
            let commanderTax = 1;

            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updateCommanderTax(playerId, commanderTax)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 1,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('returns state if null playerId is passed', () => {
            let playerId = null;
            let commanderTax = 1;

            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updateCommanderTax(playerId, commanderTax)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('Does not change commanderTax if null commanderTax is passed', () => {
            let playerId = 0;
            let commanderTax1 = 1;
            let commanderTax2 = null;

            expect(
                playerReducer(
                    playerReducer(
                        playerReducer(
                            undefined,
                            createPlayer(null, null)
                        ),
                        updateCommanderTax(playerId, commanderTax1)
                    ),
                    updateCommanderTax(playerId, commanderTax2)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 1,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('returns state if a non-existant playerId is passed', () => {
            let playerId = 1;
            let commanderTax = 1;

            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updateCommanderTax(playerId, commanderTax)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })
    })

    describe ('playerReducer#UPDATE_COMMANDER_DAMAGE', () => {
        it('returns state if null playerId is passed', () => {
            let playerId = null;
            let opposingPlayerId = 1;
            let commanderDamage = 1;

            expect(
                playerReducer(
                    playerReducer(
                        playerReducer(
                            undefined,
                            createPlayer(null, null)
                        ),
                        createPlayer(null, null)
                    ),
                    updateCommanderDamage(playerId, opposingPlayerId, commanderDamage)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                },
                '1': {
                    playerId: 1,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('returns state if null opposingPlayerId is passed', () => {
            let playerId = 0;
            let opposingPlayerId = null;
            let commanderDamage = 1;

            expect(
                playerReducer(
                    playerReducer(
                        playerReducer(
                            undefined,
                            createPlayer(null, null)
                        ),
                        createPlayer(null, null)
                    ),
                    updateCommanderDamage(playerId, opposingPlayerId, commanderDamage)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                },
                '1': {
                    playerId: 1,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('returns state if non-existant playerId is passed', () => {
            let playerId = 2;
            let opposingPlayerId = 1;
            let commanderDamage = 1;

            expect(
                playerReducer(
                    playerReducer(
                        playerReducer(
                            undefined,
                            createPlayer(null, null)
                        ),
                        createPlayer(null, null)
                    ),
                    updateCommanderDamage(playerId, opposingPlayerId, commanderDamage)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                },
                '1': {
                    playerId: 1,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('returns state if non-existant opposingPlayerId is passed', () => {
            let playerId = 0;
            let opposingPlayerId = 2;
            let commanderDamage = 1;

            expect(
                playerReducer(
                    playerReducer(
                        playerReducer(
                            undefined,
                            createPlayer(null, null)
                        ),
                        createPlayer(null, null)
                    ),
                    updateCommanderDamage(playerId, opposingPlayerId, commanderDamage)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                },
                '1': {
                    playerId: 1,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('creates two players and adds initial player damage when playerId 1 is first hit by playerId 2', () => {
            let playerId = 0;
            let opposingPlayerId = 1;
            let commanderDamage = 1;

            expect(
                playerReducer(
                    playerReducer(
                        playerReducer(
                            undefined,
                            createPlayer(null, null)
                        ),
                        createPlayer(null, null)
                    ),
                    updateCommanderDamage(playerId, opposingPlayerId, commanderDamage)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {
                        '1': 1
                    },
                    currentCounter: 0
                },
                '1': {
                    playerId: 1,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('creates two players and adds increments player damage when playerId 1 is hit again by playerId 2', () => {
            let playerId = 0;
            let opposingPlayerId = 1;
            let commanderDamage1 = 1;
            let commanderDamage2 = 2;

            expect(
                playerReducer(
                    playerReducer(
                        playerReducer(
                            playerReducer(
                                undefined,
                                createPlayer(null, null)
                            ),
                            createPlayer(null, null)
                        ),
                        updateCommanderDamage(playerId, opposingPlayerId, commanderDamage1)
                    ),
                    updateCommanderDamage(playerId, opposingPlayerId, commanderDamage2)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {
                        '1': 3
                    },
                    currentCounter: 0
                },
                '1': {
                    playerId: 1,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })
    })

    describe ('playerReducer#UPDATE_CURRENT_COUNTER', () => {
        it('create a player and change current counter to 1', () => {
            let playerId = 0;
            let currentCounter = 1;

            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updateCurrentCounter(playerId, currentCounter)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 1
                }
            })
        })

        it('returns state if null playerId is passed', () => {
            let playerId = null;
            let currentCounter = 1;

            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updateCurrentCounter(playerId, currentCounter)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('returns state if a non-existant playerId is passed', () => {
            let playerId = 1;
            let currentCounter = 1;

            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updateCurrentCounter(playerId, currentCounter)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    currentCounter: {},
                    currentCounter: 0
                }
            })
        })
    })

    describe ('playerReducer#UPDATE_PLAYER', () => {
        let name = "playerName";
        let foregroundColour = "#123";
        let backgroundColour = "#321";
        let backgroundImage = "asdfasdf";

        it('updates the player', () => {
            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updatePlayer('0', name, foregroundColour, backgroundColour, backgroundImage)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    name: name,
                    foregroundColour: foregroundColour,
                    backgroundColour: backgroundColour,
                    backgroundImage: backgroundImage,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('doesnt update player name if not provided', () => {
            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updatePlayer('0', null, foregroundColour, backgroundColour, backgroundImage)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    name: DEFAULT_PROFILE.name,
                    foregroundColour: foregroundColour,
                    backgroundColour: backgroundColour,
                    backgroundImage: backgroundImage,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('doesnt update player foregroundColour if not provided', () => {
            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updatePlayer('0', name, null, backgroundColour, backgroundImage)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    name: name,
                    foregroundColour: DEFAULT_PROFILE.foregroundColour,
                    backgroundColour: backgroundColour,
                    backgroundImage: backgroundImage,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('doesnt update player backgroundColour if not provided', () => {
            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updatePlayer('0', name, foregroundColour, null, backgroundImage)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    name: name,
                    foregroundColour: foregroundColour,
                    backgroundColour: DEFAULT_PROFILE.backgroundColour,
                    backgroundImage: backgroundImage,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('doesnt update player backgroundImage if not provided', () => {
            expect(
                playerReducer(
                    playerReducer(
                        undefined,
                        createPlayer(null, null)
                    ),
                    updatePlayer('0', name, foregroundColour, backgroundColour, null)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    name: name,
                    foregroundColour: foregroundColour,
                    backgroundColour: backgroundColour,
                    backgroundImage: DEFAULT_PROFILE.backgroundImage,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('updates the specific player', () => {
            expect(
                playerReducer(
                    playerReducer(
                        playerReducer(
                            undefined,
                            createPlayer(null, null)
                        ),
                        createPlayer(null, null)
                    ),
                    updatePlayer('1', name, foregroundColour, backgroundColour, backgroundImage)
                )
            ).toEqual({
                '0': {
                    playerId: 0,
                    ...DEFAULT_PROFILE,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                },
                '1': {
                    playerId: 1,
                    name: name,
                    foregroundColour: foregroundColour,
                    backgroundColour: backgroundColour,
                    backgroundImage: backgroundImage,
                    life: 0,
                    poison: 0,
                    commanderTax: 0,
                    commanderDamage: {},
                    currentCounter: 0
                }
            })
        })

        it('returns current state when trying to update nonexistant player', () => {
            expect(
                playerReducer(
                    undefined,
                    updatePlayer('0', name, foregroundColour, backgroundColour, backgroundImage)
                )
            ).toEqual(
                initialState
            )
        })
    })
})