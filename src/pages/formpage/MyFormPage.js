import React, { Component } from 'react'
import Form ,{Field} from '../../components/my-field-form'
import Input from '../../components/Input'

const nameRules = {required: true, message: "请输入姓名！"};
const passworRules = {required: true, message: "请输入密码！"};

export default class MyFormPage extends Component {
    formRef=React.createRef()

    componentDidMount(){
        console.log("form", this.formRef.current); //sy-log
        this.formRef.current.setFieldsValue({username: "default"});
    }

    onFinish = (val) => {
        console.log("onFinish", val); //sy-log
    };

    // 表单校验失败执行
    onFinishFailed = (val,err) => {
        console.log("onFinishFailed", val); 
        console.log("error", err); 
    };
    render() {
        return (
            <div>
                <Form
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}>
                    <Field name="username" rules={[nameRules]}>
                        <Input placeholder="Username" />
                    </Field>
                    <Field name="password" rules={[passworRules]}>
                        <Input placeholder="Password" />
                    </Field>
                    <button>Submit</button>
                </Form>
            </div>
        )
    }
}
