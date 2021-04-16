import React from 'react'
import useModel from '../simple/Model'
export default function HookDemo() {
    const [state, actions] = useModel();

    return (
        <div>
            <span> My name is {state.name}.</span>
            <button onClick={() => actions.changeName('helloworld')}>btn1</button>
        </div>
    )
}
