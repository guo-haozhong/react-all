import React, { useContext } from 'react'
import RouterContext from './RouterContext'

export default function Link({ children, to, ...restProps }) {
    const { history } = useContext(RouterContext)
    const handleClik = (e) => {
        //阻止默认事件的方法，
        //调用此方法是，连接不会被打开，但是会发生冒泡，冒泡会传递到上一层的父元素
        e.preventDefault()
        history.push(to)
    }
    return (
        <a href={to}{...restProps} onClick={handleClik}>
            {children}
        </a>
    )
}
