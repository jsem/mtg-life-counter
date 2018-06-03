import { CREATE_PROFILE, DELETE_PROFILE, UPDATE_PROFILE } from './ProfileAction';
import { createProfile, deleteProfile, updateProfile } from './ProfileAction';

describe('PlayerAction', () => {
    it('createProfile action creator creates a CREATE_PROFILE action', () => {
        expect(
            createProfile()
        ).toEqual({
            type: CREATE_PROFILE
        })
    })
    
    it('deleteProfile action creator creates a DELETE_PROFILE action', () => {
        let profileId = '1';
        
        expect(
            deleteProfile(
                profileId
            )
        ).toEqual({
            type: DELETE_PROFILE,
            profileId: profileId
        })
    })

    describe('PayerAction#updateProfile', () => {
        let profileId = '1';
        let name = 'playerName';
        let foregroundColour = '#123';
        let backgroundColour = '#321';
        let backgroundImage = 'asdfasdfasdf';

        it('updateProfile action creator creates an UPDATE_PROFILE action', () => {
            expect(
                updateProfile(
                    profileId,
                    name,
                    foregroundColour,
                    backgroundColour,
                    backgroundImage
                )
            ).toEqual({
                type: UPDATE_PROFILE,
                profileId: profileId,
                values: {
                    name: name,
                    foregroundColour: foregroundColour,
                    backgroundColour: backgroundColour,
                    backgroundImage: backgroundImage
                }
            })
        })

        it('updateProfile action creator with all values null creates an UPDATE_PROFILE action', () => {
            expect(
                updateProfile(
                    profileId,
                    null,
                    null,
                    null,
                    null
                )
            ).toEqual({
                type: UPDATE_PROFILE,
                profileId: profileId,
                values: {}
            })
        })

        it('updateProfile action creator with all name null creates an UPDATE_PROFILE action', () => {
            expect(
                updateProfile(
                    profileId,
                    null,
                    foregroundColour,
                    backgroundColour,
                    backgroundImage
                )
            ).toEqual({
                type: UPDATE_PROFILE,
                profileId: profileId,
                values: {
                    foregroundColour: foregroundColour,
                    backgroundColour: backgroundColour,
                    backgroundImage: backgroundImage
                }
            })
        })

        it('updateProfile action creator with all foregroundColor null creates an UPDATE_PROFILE action', () => {
            expect(
                updateProfile(
                    profileId,
                    name,
                    null,
                    backgroundColour,
                    backgroundImage
                )
            ).toEqual({
                type: UPDATE_PROFILE,
                profileId: profileId,
                values: {
                    name: name,
                    backgroundColour: backgroundColour,
                    backgroundImage: backgroundImage
                }
            })
        })

        it('updateProfile action creator with all backgroundColor null creates an UPDATE_PROFILE action', () => {
            expect(
                updateProfile(
                    profileId,
                    name,
                    foregroundColour,
                    null,
                    backgroundImage
                )
            ).toEqual({
                type: UPDATE_PROFILE,
                profileId: profileId,
                values: {
                    name: name,
                    foregroundColour: foregroundColour,
                    backgroundImage: backgroundImage
                }
            })
        })

        it('updateProfile action creator with all backgroundImage null creates an UPDATE_PROFILE action', () => {
            expect(
                updateProfile(
                    profileId,
                    name,
                    foregroundColour,
                    backgroundColour,
                    null
                )
            ).toEqual({
                type: UPDATE_PROFILE,
                profileId: profileId,
                values: {
                    name: name,
                    foregroundColour: foregroundColour,
                    backgroundColour: backgroundColour
                }
            })
        })
    })
})