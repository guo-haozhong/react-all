export default function combineReducers(reducers) {
    return function combination(state = {}, action) {
        let nextState = {}
        let hashChange = false
        for (let key in reducers) {
            const reducer = reducers[key]
            nextState[key] = reducer(state[key], action)
            hashChange = hashChange || nextState[key] !== state[key]
        }
        hashChange = hashChange || Object.keys(nextState).length !== Object.keys(state).length
        return hashChange ? nextState : state
    }
}

