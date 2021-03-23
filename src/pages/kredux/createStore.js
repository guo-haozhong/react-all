export default function createStore(reducer, enhancer) {
    // enhancer是加强dispatch
    if (enhancer) {
        return enhancer(createStore)(reducer)
    }

    let currentState;
    let currentListeners = [];

    //set
    function getState() {
        return currentState
    }
    //set
    function dispatch(action) {
        currentState = reducer(currentState, action)
        // state改变，执行订阅的函数
        currentListeners.forEach((listener) => listener())
    }

    // 订阅和取消订阅必须要成对出现
    function subscribe(listener) {
        currentListeners.push(listener)
        return ()=>{
            //找到数组里的索引，然后用splice删除
            const index=currentListeners.indexOf(listener)
            currentListeners.splice(index,1)
        }
    }

    dispatch({type:"@REDUX/XXXXXXXXXXXXXXXXXXXX"})

    return {
        getState,
        dispatch,
        subscribe
    }
}