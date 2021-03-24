import React, {
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from "react";

// React跨层级数据传递 context
// 1. 创建context对象
const Context = React.createContext()
// 2. Provider 传递value
export function Provider({ store, children }) {
    return <Context.Provider value={store}>{children}</Context.Provider>
}

// 3. 子组件消费context value
// 消费方式有三种： contextType(只能用在类组件，只能订阅单一的context来源)
// useContext（只能用在函数组件以及自定义hook中）
// Consumer
export const connect = (mapStateToProps, mapDispatchToProps) => (
    WrappedComponent
) => (props) => {
    const store = useContext(Context)
    const { getState, dispatch } = store

    const stateProps = mapStateToProps(getState())
    let dispatchProps = { dispatch }
    if (typeof mapDispatchToProps === "function") {
        dispatchProps = mapDispatchToProps(dispatch)
    } else if (typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
    }

    const forceUpdate = useForceUpdate()
    // 订阅state的变更
    useLayoutEffect(() => {
        const unsubscribe = store.subscribe(() => {
            forceUpdate()
        })
        //卸载之前执行取消订阅
        return () => {
            unsubscribe()
        }
    }, [store])

    return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
}

export function bindActionCreators(creators, dispatch) {
    let obj = {}
    for (let key in creators) {
        obj[key] = bindActionCreator(creators[key], dispatch)
    }
    return obj
}

function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args))
}


function useForceUpdate() {
    const [state, setstate] = useState(0)
    const update = useCallback(() => {
        setstate((pre) => pre + 1)
    })
    return update
}


/***
 * Hook写法
 */

//get state
export function useSelector(selector) {
    const store = useStore()
    const { getState } = store

    //返回的state
    const selectorState = selector(getState())

    const forceUpdate = useForceUpdate()
    useLayoutEffect(() => {
        const unsubscribe = store.subscribe(() => {
            forceUpdate()
        })
        return () => {
            unsubscribe()
        }
    }, [store])

    return selectorState
}
// set
export function useDispatch() {
    const store = useStore();
    return store.dispatch;
}

export function useStore() {
    const store = useContext(Context)
    return store
}