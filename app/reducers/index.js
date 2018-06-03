import { combineReducers } from 'redux';

import gameReducer from './GameReducer';
import profileReducer from './ProfileReducer';

/**
 * Combined reducer for the global store
 */
const reducer = combineReducers({
    gameReducer,
    profileReducer
})

export default reducer;