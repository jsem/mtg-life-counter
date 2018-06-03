import profileReducer, { initialState } from './ProfileReducer';
import { createProfile, deleteProfile, updateProfile } from '../actions/ProfileAction';
import { DEFAULT_PROFILE } from '../config/defaultProfiles';

describe('profileReducer', () => {
    it ('should return the initial state', () => {
        expect(
            profileReducer(undefined, {})
        ).toEqual(
            initialState
        )
    })

    describe ('profileReducer#CREATE_PROFILE', () => {
        it('creates a new profile', () => {
            expect(
                profileReducer(
                    undefined,
                    createProfile()
                )
            ).toEqual({
                '1': DEFAULT_PROFILE
            })
        })

        it('increments the profile id', () => {
            expect(
                profileReducer(
                    profileReducer(
                        undefined,
                        createProfile()
                    ),
                    createProfile()
                )
            ).toEqual({
                '1': DEFAULT_PROFILE,
                '2': DEFAULT_PROFILE
            })
        })

        it('increments the profile id even after deleting an old profile', () => {
            expect(
                profileReducer(
                    profileReducer(
                        profileReducer(
                            profileReducer(
                                profileReducer(
                                    undefined,
                                    createProfile()
                                ),
                                createProfile()
                            ),
                            createProfile()
                        ),
                        deleteProfile('2')
                    ),
                    createProfile()
                )
            ).toEqual({
                '1': DEFAULT_PROFILE,
                '3': DEFAULT_PROFILE,
                '4': DEFAULT_PROFILE
            })
        })
    })

    describe ('profileReducer#DELETE_PROFILE', () => {
        it('deletes the profile', () => {
            expect(
                profileReducer(
                    profileReducer(
                        undefined,
                        createProfile()
                    ),
                    deleteProfile('1')
                )
            ).toEqual(
                initialState
            )
        })

        it('deletes the specific profile', () => {
            expect(
                profileReducer(
                    profileReducer(
                        profileReducer(
                            undefined,
                            createProfile()
                        ),
                        createProfile()
                    ),
                    deleteProfile('1')
                )
            ).toEqual({
                '2': DEFAULT_PROFILE
            })
        })
    })

    describe ('profileReducer#UPDATE_PROFILE', () => {
        let name = "profileName";
        let foregroundColour = "#123";
        let backgroundColour = "#321";
        let backgroundImage = "asdfasdf";

        it('updates the profile', () => {
            expect(
                profileReducer(
                    profileReducer(
                        undefined,
                        createProfile()
                    ),
                    updateProfile('1', name, foregroundColour, backgroundColour, backgroundImage)
                )
            ).toEqual({
                '1': {
                    name: name,
                    foregroundColour: foregroundColour,
                    backgroundColour: backgroundColour,
                    backgroundImage: backgroundImage
                }
            })
        })

        it('doesnt update profile name if not provided', () => {
            expect(
                profileReducer(
                    profileReducer(
                        undefined,
                        createProfile()
                    ),
                    updateProfile('1', null, foregroundColour, backgroundColour, backgroundImage)
                )
            ).toEqual({
                '1': {
                    name: DEFAULT_PROFILE.name,
                    foregroundColour: foregroundColour,
                    backgroundColour: backgroundColour,
                    backgroundImage: backgroundImage
                }
            })
        })

        it('doesnt update profile foregroundColour if not provided', () => {
            expect(
                profileReducer(
                    profileReducer(
                        undefined,
                        createProfile()
                    ),
                    updateProfile('1', name, null, backgroundColour, backgroundImage)
                )
            ).toEqual({
                '1': {
                    name: name,
                    foregroundColour: DEFAULT_PROFILE.foregroundColour,
                    backgroundColour: backgroundColour,
                    backgroundImage: backgroundImage
                }
            })
        })

        it('doesnt update profile backgroundColour if not provided', () => {
            expect(
                profileReducer(
                    profileReducer(
                        undefined,
                        createProfile()
                    ),
                    updateProfile('1', name, foregroundColour, null, backgroundImage)
                )
            ).toEqual({
                '1': {
                    name: name,
                    foregroundColour: foregroundColour,
                    backgroundColour: DEFAULT_PROFILE.backgroundColour,
                    backgroundImage: backgroundImage
                }
            })
        })

        it('doesnt update profile backgroundImage if not provided', () => {
            expect(
                profileReducer(
                    profileReducer(
                        undefined,
                        createProfile()
                    ),
                    updateProfile('1', name, foregroundColour, backgroundColour, null)
                )
            ).toEqual({
                '1': {
                    name: name,
                    foregroundColour: foregroundColour,
                    backgroundColour: backgroundColour,
                    backgroundImage: DEFAULT_PROFILE.backgroundImage
                }
            })
        })

        it('updates the specific profile', () => {
            expect(
                profileReducer(
                    profileReducer(
                        profileReducer(
                            undefined,
                            createProfile()
                        ),
                        createProfile()
                    ),
                    updateProfile('2', name, foregroundColour, backgroundColour, backgroundImage)
                )
            ).toEqual({
                '1': DEFAULT_PROFILE,
                '2': {
                    name: name,
                    foregroundColour: foregroundColour,
                    backgroundColour: backgroundColour,
                    backgroundImage: backgroundImage
                }
            })
        })

        it('returns current state when trying to update nonexistant profile', () => {
            expect(
                profileReducer(
                    undefined,
                    updateProfile('1', name, foregroundColour, backgroundColour, backgroundImage)
                )
            ).toEqual(
                initialState
            )
        })
    })
})