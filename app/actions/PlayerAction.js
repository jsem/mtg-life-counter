export const CLEAR_PLAYERS = 'CLEAR_PLAYERS';
export const CREATE_PLAYER = 'CREATE_PLAYER';
export const UPDATE_LIFE = 'UPDATE_LIFE';
export const UPDATE_POISON = 'UPDATE_POISON';
export const UPDATE_COMMANDER_TAX = 'UPDATE_COMMANDER_TAX';
export const UPDATE_COMMANDER_DAMAGE = 'UPDATE_COMMANDER_DAMAGE';
export const UPDATE_CURRENT_COUNTER = 'UPDATE_CURRENT_COUNTER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';

/**
 * Create a CLEAR_PLAYERS action
 */
export function clearPlayers() {
    return {
        type: CLEAR_PLAYERS
    }
}

/**
 * Create a CREATE_PLAYER action
 * @param {*} profile a profile to apply to the player (nullable)
 * @param {*} startingLife the starting life total for the player
 */
export function createPlayer(profile, startingLife) {
    return {
        type: CREATE_PLAYER,
        profile: profile,
        startingLife: startingLife
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
        amount: amount
    }
}

/**
 * Create an UPDATE_CURRENT_COUNTER action
 * @param {*} playerId the id of the player to edit
 * @param {*} number the number of the current counter being used by the player
 */
export function updateCurrentCounter(playerId, number) {
    return {
        type: UPDATE_CURRENT_COUNTER,
        playerId: playerId,
        number: number
    }
}

 /**
  * Create an UPDATE_PLAYER action
  * @param {*} playerId the id of the player to edit
  * @param {*} name name of the player (nullable)
  * @param {*} foregroundColour foreground colour of the player (nullable)
  * @param {*} backgroundColour background colour of the player (nullable)
  * @param {*} backgroundImage background image of the player (nullable)
  */
export function updatePlayer(playerId, name, foregroundColour, backgroundColour, backgroundImage) {
    let playerUpdate = {
        type: UPDATE_PLAYER,
        playerId: playerId,
        values: {}
    }
    if(name != null) {
        playerUpdate.values["name"] = name;
    }
    if(foregroundColour != null) {
        playerUpdate.values["foregroundColour"] = foregroundColour;
    }
    if(backgroundColour != null) {
        playerUpdate.values["backgroundColour"] = backgroundColour;
    }
    if(backgroundImage != null) {
        playerUpdate.values["backgroundImage"] = backgroundImage;
    }
    return playerUpdate;
}
