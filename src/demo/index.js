import React from 'react'
//交通等class
import TrafficLight from './TrafficLight/TrafficLight' 
//交通等hook
import TrafficLightHook from './TrafficLight/TrafficLightHook' 
//通过hook封装useModel
import HookDemo from './hook/Test/index'
//通过@ice/store封装useModel
import Counter from './icestore/index'
export default function App() {
    return (
        <div>
           <Counter/>
        </div>
    )
}
