import './index.css'
import Component from "../../kreact/Component";

class ClassComponent extends Component {
    render() {
        return (
            <div className="border">
                <p>{this.props.name}</p>
            </div>
        );
    }
}
function FunctionComponent(props) {
    return (
        <div className="border">
            <p>{props.name}</p>
            <button
                onClick={() => {
                    console.log("omg"); //sy-log
                }}>
                click
        </button>
        </div>
    );
}

export const jsx = (
    <div className="border">
        <h1>定个全栈的小目标</h1>
        <a href="https://juejin.cn/">掘金</a>
        <FunctionComponent name="function" />
        <ClassComponent name="class" />
        
        <>
            <h1>哈哈哈</h1>
            <h2>呵呵呵</h2>
        </>
    </div>
)

