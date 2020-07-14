import * as  redux from "redux";
import { combineReducers } from "redux";
import ReduxThunk from "redux-thunk";

import {fetchRemaindersReducer} from "./reducer";

const rootReducer = combineReducers({
    fetchRemaindersReducer: fetchRemaindersReducer
});

const store = redux.createStore(rootReducer,redux.applyMiddleware(ReduxThunk));

export default store;