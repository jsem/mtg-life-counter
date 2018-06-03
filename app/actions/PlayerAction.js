export const CREATE_PLAYER = 'CREATE_PLAYER';
export const UPDATE_LIFE = 'UPDATE_LIFE';
export const UPDATE_POISON = 'UPDATE_POISON';
export const UPDATE_COMMANDER_TAX = 'UPDATE_COMMANDER_TAX';
export const UPDATE_COMMANDER_DAMAGE = 'UPDATE_COMMANDER_DAMAGE';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';

/**
 * Create a CREATE_PLAYER action
 * @param {*} profile a profile to apply to the player
 */
export function createPlayer(profile) {
    return {
        type: CREATE_PLAYER,
        profile: profile
    }
}

/**
 * Create an UPDATE_LIFE action
 * @param {*} playerId the id of the player to edit
 * @param {*} amount the amount of life to add/subract
 */
export function updateLife(playerId, amount) {
    return {
        type: UPDATE_LIFE,
        playerId: playerId,
        amount: amount
    }
}

/**
 * Create an UPDATE_POISON action
 * @param {*} playerId the id of the player to edit
 * @param {*} amount the amount of poison counters to add/subract
 */
export function updatePoison(playerId, amount) {
    return {
        type: UPDATE_POISON,
        playerId: playerId,
        amount: amount
    }
}

/**
 * Create an UPDATE_COMMANDER_TAX action
 * @param {*} playerId the id of the player to edit
 * @param {*} amount the amount of commander tax to add/subract
 */
export function updateCommanderTax(playerId, amount) {
    return {
        type: UPDATE_COMMANDER_TAX,
        playerId: playerId,
        amount: amount
    }
}

/**
 * Create an UPDATE_COMMANDER_DAMAGE action
 * @param {*} playerId the id of the player to edit
 * @param {*} opposingPlayerId the id of the opposing player who hit the player to edit
 * @param {*} amount the amount of commander damage to add/subract
 */
export function updateCommanderDamage(playerId, opposingPlayerId, amount) {
    return {
        type: UPDATE_COMMANDER_DAMAGE,
        playerId: playerId,
        opposingPlayerId: opposingPlayerId,
        amount:amount
    }
}
 /**
  * Create an UPDATE_PLAYER action
  * @param {*} playerId the id of the player to edit
  * @param {*} name name of the player
  * @param {*} foregroundColor foreground color of the player
  * @param {*} backgroundColor background color of the player
  * @param {*} backgroundImage background image of the player
  */
export function updatePlayer(playerId, name, foregroundColor, backgroundColor, backgroundImage) {
    return {
        type: UPDATE_PLAYER,
        playerId: playerId,
        name: name,
        foregroundColor: foregroundColor,
        backgroundColor: backgroundColor,
        backgroundImage: backgroundImage
    }
}