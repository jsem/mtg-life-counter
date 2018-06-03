export const CREATE_PROFILE = 'CREATE_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

/**
 * Create a CREATE_PROFILE action
 */
export function createProfile() {
    return {
        type: CREATE_PROFILE
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
 * @param {*} name the name to update the profile with (nullable)
 * @param {*} foregroundColour the foreground colour to update the profile with (nullable)
 * @param {*} backgroundColour the background colour to update the profile with (nullable)
 * @param {*} backgroundImage the background image to update the profile with (nullable)
 */
export function updateProfile(profileId, name, foregroundColour, backgroundColour, backgroundImage) {
    let profileUpdate = {
        type: UPDATE_PROFILE,
        profileId: profileId,
        values: {}
    }
    if (name != null) {
        profileUpdate.values["name"] = name;
    }
    if (foregroundColour != null) {
        profileUpdate.values["foregroundColour"] = foregroundColour;
    }
    if (backgroundColour != null) {
        profileUpdate.values["backgroundColour"] = backgroundColour;
    }
    if (backgroundImage != null) {
        profileUpdate.values["backgroundImage"] = backgroundImage;
    }
    return profileUpdate;
}