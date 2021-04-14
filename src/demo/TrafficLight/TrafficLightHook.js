import React, { useEffect, useState, useMemo } from 'react'

export default function TrafficLightHook() {
    const lights = [
        { color: "red", duration: 8000, twinkleDuration: 4000 },
        { color: "green", duration: 10000, twinkleDuration: 6000 },
        { color: "yellow", duration: 4000, twinkleDuration: 2000 }
    ]

    return (
        <div>
            <TrafficLightItem lights={lights}></TrafficLightItem>
        </div>
    )
}
function TrafficLightItem(props) {
    const [color, setcolor] = useState('#fff')
    useEffect(() => {
        const fn = async () => {
            const { lights } = props
            for (let i = 0; i < lights.length; i++) {
                const cur = lights[i]
                const normaltime = cur.duration - cur.twinkleDuration
                await normal(cur.color, normaltime) //正常亮灯-不闪烁的时间
                await twinkle(cur.color, cur.twinkleDuration)//正常亮灯-最后的几秒闪烁
    
            }
            fn()
        }
        fn()
        return () => {

        }
    }, [])

    //正常亮灯
    const normal = useMemo(() => {
        return (color, delay) => {
            return new Promise((resolve) => {
                setCurColor(color)
                setTimeout(() => {
                    resolve("")
                }, delay)
            })
        }
    }, [])
    //闪烁
    const twinkle = useMemo(() => {
        return (color, delay) => {
            return new Promise((resolve) => {
                let cur = color //当前颜色
                let flag = true
                let interval = setInterval(() => {
                    if (flag) {
                        if (cur === color) {
                            //如果相等就改变颜色、造一个闪烁的效果
                            cur = "#e1e1e1"
                            setCurColor("#e1e1e1")
                        } else {
                            cur = color
                            setCurColor(color)
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
    }, [])

    const setCurColor = (color) => {
        console.log('亮灯：', color);
        setcolor(color)
    }
    return (
        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
            <div style={{
                backgroundColor: color,
                width: '50px', height: '50px', borderRadius: '25px',
            }}></div>
        </div>
    )
}