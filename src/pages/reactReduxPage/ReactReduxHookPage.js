import React, { useCallback } from 'react'
import { useSelector, useDispatch } from '../../kReactRedux/index'
export default function ReactReduxHookPage({ props }) {
    const dispatch = useDispatch();
    const add = useCallback(() => {
        dispatch({ type: "ADD" });
    }, []);

    const count = useSelector(({ count }) => count);

    return (
        <div>
            <h3>ReactReduxHookPage</h3>
            <p>{count}</p>
            <button onClick={add}>add</button>
        </div>
    )
}

