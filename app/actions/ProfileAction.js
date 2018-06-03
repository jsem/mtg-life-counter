export const CREATE_PROFILE = 'CREATE_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

/**
 * Create a CREATE_PROFILE action
 * @param {*} profileId the id of the profile to create (nullable)
 */
export function createProfile(profileId) {
    return {
        type: CREATE_PROFILE,
        profileId: profileId
    }
}

/**
 * Create a DELETE_PROFILE action
 * @param {*} profileId the id of the profile to delete
 */
export function deleteProfile(profileId) {
    return {
        type: DELETE_PROFILE,
        profileId: profileId
    }
}

/**
 * Create an UPDATE_PROFILE action
 * @param {*} profileId the id of the profile to update
 * @param {*} values JSON object containing the values to update on the profile
 */
export function updateProfile(profileId, values) {
    return {
        type: UPDATE_PROFILE,
        profileId: profileId,
        values: { ...values }
    }
}