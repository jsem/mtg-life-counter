import { combineReducers } from 'redux';

import gameReducer from './GameReducer';
import playerReducer from './PlayerReducer';

/**
 * Combined reducer for the global store
 */
const reducer = combineReducers({
    gameReducer,
    playerReducer
})

export default reducer;