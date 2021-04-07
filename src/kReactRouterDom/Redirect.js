import React, { Component } from "react";
import LifeCycle from "./LifeCycle";
import RouterContext from "./RouterContext";

export default class Redirect extends Component {
    render() {
        return (
            <RouterContext.Consumer>
                {context => {
                    const { history } = context;
                    const { to, push = false } = this.props;
                    return (
                        <LifeCycle
                            onMount={() => {
                                push ? history.push(to) : history.replace(to);
                            }}
                        />
                    );
                }}
            </RouterContext.Consumer>
        );
    }
}
