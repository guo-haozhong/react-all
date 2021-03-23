import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from '../kredux/index'
import isPromise from "is-promise"

function countReducer(state = 0, action) {
    switch (action.type) {
        case "ADD":
            return state + 1
        case "MINUS":
            return state - action.payload || 1;
        default:
            return state;
    }
}

const store = createStore(
    combineReducers({
        count: countReducer
    }),
    applyMiddleware(thunk, promise, logger)
)

export default store

function thunk({ getState, dispatch }) {
    return (next) => (action) => {
        if (typeof action === "function") {
            return action(dispatch, getState)
        }
        return next(action)
    }
}

function logger({ getState, dispatch }) {
    return (next) => (action) => {
        console.log(action.type + "执行了！");
        const prevState = getState();
        console.log("prev state", prevState);

        const returnValue = next(action);

        const nextState = getState();
        console.log("next state", nextState);
        return returnValue
    }
}

function promise({ getState, dispatch }) {
    return (next) => (action) => {
        return isPromise(action) ? action.then(dispatch) : next(action)
    }
}