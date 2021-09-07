/** 信号灯控制器
用 React 实现一个信号灯（交通灯）控制器，要求：
1. 默认情况下，
  1.1. 红灯亮20秒，并且最后5秒闪烁
  1.2. 绿灯亮20秒，并且最后5秒闪烁
  1.3. 黄灯亮10秒
  1.4. 次序为 红-绿-黄-红-绿-黄
2. 灯的个数、颜色、持续时间、闪烁时间、灯光次序都可配置，如：
   lights=[{color: '#fff', duration: 10000, twinkleDuration: 5000}, ... ]
*/

import React, { Component, PureComponent } from 'react'

export default class TrafficLight extends Component {
    render() {
        const lights = [
            { color: "red", duration: 20000, twinkleDuration: 5000 },
            { color: "green", duration: 20000, twinkleDuration: 5000 },
            { color: "yellow", duration: 10000, twinkleDuration: 0 }
        ]
        return (
            <div>
                <TrafficLightItem lights={lights}></TrafficLightItem>
            </div>
        )
    }
}
class TrafficLightItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color: '#fff'
        }
    }
    componentDidMount() {
        this.fn()
    }
    fn = async () => {
        const { lights } = this.props
        for (let i = 0; i < lights.length; i++) {
            const cur = lights[i]
            const normaltime = cur.duration - cur.twinkleDuration
            await this.normal(cur.color, normaltime) //正常亮灯-不闪烁的时间
            await this.twinkle(cur.color, cur.twinkleDuration)//正常亮灯-最后的几秒闪烁
        }
        this.fn()
    }
    normal = (color, delay) => {
        return new Promise((resolve) => {
            this.setCurColor(color)
            setTimeout(() => {
                resolve("")
            }, delay)
        })
    }
    twinkle = (color, delay) => {
        return new Promise((resolve) => {
            let cur = color
            let flag = true
            let interval = setInterval(() => {
                if (flag) {
                    if (cur === color) {
                        cur = "#e1e1e1"
                        this.setCurColor("#e1e1e1")
                    } else {
                        cur = color
                        this.setCurColor(color)
                    }
                }
            }, 1000)
            setTimeout(() => {
                flag = false
                clearInterval(interval)
                resolve("")
            }, delay)
        })
    }
    setCurColor = (color) => {
        console.log('亮灯：', color);
        this.setState({
            color
        })
    }

    render() {
        const { color, count } = this.state
        return (
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <div style={{
                    backgroundColor: color,
                    width: '50px', height: '50px', borderRadius: '25px',
                }}></div>
            </div>
        );
    }
}