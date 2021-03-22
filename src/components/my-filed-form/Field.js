import React, {Component} from "react";
import FieldContext from "./Context";

export default class Field extends Component {
  //Field.contextType = FieldContext;
  static contextType = FieldContext;

  componentDidMount() {
    // 注册
    this.unregister = this.context.registerFieldEntities(this);
  }

  componentWillUnmount() {
    if (this.unregister) {
      this.unregister();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const {getFieldValue, setFieldsValue} = this.context;
    const {name} = this.props;
    return {
      value: getFieldValue(name), //"omg", // get
      onChange: (e) => {
        const newValue = e.target.value;
        // set
        setFieldsValue({
          [name]: newValue,
        });
      },
    };
  };
  render() {
    const {children} = this.props;
    //把Field属性的值clone到children即Input组件 赋予了value、onChange的属性
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}
