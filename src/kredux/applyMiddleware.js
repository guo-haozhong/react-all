export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer) => {
        const store = createStore(reducer)
        let dispatch = store.dispatch
        // 达到的目的:组件里执行dispatch的时候要执行中间件函数和store.dispatch
        // 原先的dispatch只能处理plain objects，加强之后要能处理函数、promise等
        const middlewareApi = {
            getState: store.getState,
            dispatch: (action, ...args) => dispatch(action, ...args)
        }

        //map注意要返回值
        const middlewaresChain = middlewares.map((middleware) => {
            return middleware(middlewareApi)
        })

        // middlewaresChain中间件数组
        // 按照顺序执行中间件函数
        // 加强版的dispatch
        dispatch = compose(...middlewaresChain)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}

function compose(...funcs) {
    if (funcs.length === 0) {
        return (arg) => arg
    }
    if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}