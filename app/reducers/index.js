import { combineReducers } from 'redux';

import gameReducer from './GameReducer';

/**
 * Combined reducer for the global store
 */
const reducer = combineReducers({
    gameReducer
})

export default reducer;