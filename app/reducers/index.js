import { combineReducers } from 'redux';

import gameReducer from './GameReducer';
import playerReducer from './PlayerReducer';
import profileReducer from './ProfileReducer';

/**
 * Combined reducer for the global store
 */
const reducer = combineReducers({
    game: gameReducer,
    player: playerReducer,
    profile: profileReducer
})

export default reducer;