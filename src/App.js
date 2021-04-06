import React from 'react'
//手写Form组件--仿照antd
import MyFormPage from './pages/formpage/MyFormPage'

//手写简易版的redux
import ReduxPage from './pages/reduxpage/ReduxPage'

//手写简易版react-redux
//示例1 Hook写法
import ReactReduxHookPage from './pages/reactReduxPage/ReactReduxHookPage'
//示例2 class组件写法
import ReactReduxPage from './pages/reactReduxPage/ReactReduxPage'

//手写react-router路由
import ReactRouterPage from './pages/routerPage/index'
export default function App() {
    return (
        <div>
            <ReactRouterPage />
        </div>
    )
}
