import React from 'react';
import { createStore } from '@ice/store';

const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

// 1️⃣ Use a model to define your store
const counter = {
    state: 0,
    reducers: {
        increment: (prevState) => prevState + 1,
        decrement: (prevState) => prevState - 1,
    },
    effects: () => ({
        async asyncDecrement() {
            await delay(1000);
            this.decrement();
        },
    })
};

const models = {
    counter,
};

// 2️⃣ Create the store
const store = createStore(models);

// 3️⃣ Consume model
const { useModel, Provider } = store;

export default function App() {
    return (
        <Provider>
            <Counter />
        </Provider>
    );
}
function Counter() {
    const [count, dispatchers] = useModel('counter');
    const { increment, decrement,asyncDecrement } = dispatchers;
    return (
        <div>
            <span>{count}</span>
            <button type="button" onClick={increment}>+</button>
            <button type="button" onClick={decrement}>-</button>
            <button type="button" onClick={asyncDecrement}>异步-</button>
        </div>
    );
}