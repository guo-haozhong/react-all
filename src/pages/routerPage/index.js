import React, { Component, useState } from 'react'
// import {
//     BrowserRouter as Router,
//     Route,
//     Link,
//     Switch,
//     Redirect,
//     useHistory,
//     useLocation,
//     useRouteMatch,
//     useParams,
//     withRouter,
//     Prompt,
// } from "react-router-dom";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
  withRouter,
  // Redirect
} from "../../kReactRouterDom/";

import HomePage from "./HomePage";
import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import _404Page from "./_404Page";

export default function ReactRouterPage() {
    return (
        <div className="App">
            <Router>
                <Link to="/">首页</Link>
                <Link to="/user">用户中心</Link>
                <Link to="/login">登录</Link>
                <Link to="/product/123">商品</Link>

                {/* 独占路由 */}
                <Switch>
                    <Route
                        path="/"
                        exact
                        // children={children}
                        component={HomePage}
                        render={render}>
                        {/* omg */}
                    </Route>
                    <Route path="/user" component={UserPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/product/:id" render={() => <Product />} />
                    <Route component={_404Page} />
                </Switch>
            </Router>
        </div>
    )
}

@withRouter
class Product extends Component {
  render() {
    const {match} = this.props;
    const {params, url} = match;
    const {id} = params;
    return (
      <div>
        <h1>Search-{id}</h1>
        <Link to={url + "/detail"}>详情</Link>
        <Route path={url + "/detail"} component={Detail} />
      </div>
    );
  }
}

// function Product() {
//     const [confirm, setConfirm] = useState(true);
//     const match = useRouteMatch();
//     console.log("match", match);
//     const { params, url } = match;
//     const { id } = params;
//     return (
//         <div>
//             <h1>Search-{id}</h1>
//             <Link to={url + "/detail"}>详情</Link>
//             <Route path={url + "/detail"} component={Detail} />

//             <Prompt
//                 when={confirm}
//                 // message="Are you sure you want to leave?"
//                 message={(location) => {
//                     return "Are you sure you want to leave-fun";
//                 }}
//             />
//         </div>
//     );
// }


function Detail(props) {
    console.log("detail", props); //sy-log
    return (
        <div>
            <h1>detail</h1>
        </div>
    );
}

// route渲染： children > component > render
function children(props) {
    console.log("children props", props);
    return <div>children</div>;
}
function render(props) {
    console.log("render props", props);
    return <div>render</div>;
}