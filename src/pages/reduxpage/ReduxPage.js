import React, { Component } from 'react'
import store from '../../store/'
export default class ReduxPage extends Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
        })
    }
    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe()
        }
    }
    add = () => {
        store.dispatch({ type: "ADD" })
    }
    asyAdd = () => {
        store.dispatch((dispatch, getState) => {
            setTimeout(() => {
                dispatch({ type: "ADD", payload: 1 })
            }, 1000)
        })        
    }
    promiseMinus = () => {
        store.dispatch(
            Promise.resolve({
                type:"MINUS",
                payload:100
            })
        )
    }
    render() {
        return (
            <div>
                <h3>ReduxPage</h3>
                <p>{store.getState().count}</p>
                <button onClick={this.add}>add</button>
                <button onClick={this.asyAdd}>asyAdd</button>
                <button onClick={this.promiseMinus}>promiseMinus</button>

            </div>
        )
    }
}
