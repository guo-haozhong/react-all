import React, { Component } from 'react'
import { bindActionCreators, connect } from '../kReactRedux/index';

class ReactReduxPage extends Component {
    render() {
        console.log("props", this.props); //sy-log
        const { count, dispatch, add, minus } = this.props;

        return (
            <div>
                <h3>ReactReduxPage</h3>
                <p>{count}</p>

                <button onClick={add}> add </button>
                <button onClick={minus}> minus </button>

                {/* <button onClick={() => dispatch({ type: "ADD", payload: 100 })}>
                    dispatch add
                 </button> */}

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    count: state.count
})
//传object
const mapDispatchToProps = {
    add: () => ({ type: "ADD" }),
    minus: () => ({ type: "MINUS" }),
}
//传function
const mapDispatchToProps_func = (dispatch) => {
    let creators = {
        add: () => ({ type: "ADD" }),
        minus: () => ({ type: "MINUS" })
    }
    creators = bindActionCreators(creators, dispatch)
    return { dispatch, ...creators }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxPage)