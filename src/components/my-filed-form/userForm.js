import { useRef } from "react";
export default function useForm(form) {
    const formRef = useRef()

    if (!formRef.current) {
        if (form) {
            form.current = form
        } else {
            const formStore = new FormStore()
            formRef.current = formStore.getForm()
        }
    }

    return [formRef.current]
}

class FormStore {
    constructor() {
        this.store = {} //状态库
        this.fieldEntities = []//组件实例

        this.callbacks = {}
    }
    //get
    getFieldsValue = () => {
        return { ...this.store }
    }
    //set
    setFieldsValue = (newStore) => {
        // name: value
        // 1. 修改状态库
        this.store = {
            ...this.store,
            ...newStore
        }
        // 2. 更新组件
        this.fieldEntities.forEach((entity) => {
            Object.keys(newStore).forEach((k) => {
                if (k === entity.props.name) {
                    entity.onStoreChange()
                }
            })
        })
    }
    getFieldValue = (name) => {
        return this.store[name];
    }

    // 有注册，得有取消注册，
    // 订阅和取消订阅也是要成对出现的
    registerFieldEntities = (entity) => {
        this.fieldEntities.push(entity)
        return () => {
            this.fieldEntities = this.fieldEntities.filter(
                (_entity) => _entity != entity
            )
            delete this.store[entity.props.name]
        }
    }

    validate = () => {
        let err = [];
        // 校验
        // console.log('this.store', this.store);
        // console.log('fieldEntities', this.fieldEntities);
        this.fieldEntities.forEach((field) => {
            const name = field.props.name
            const rules=field.props.rules
            if (rules && rules[0].required && !this.store[name]) {
                //如果为空
                err.push({ [name]: this.store[name] })
            }
        })
        return err;
    };

    submit = () => {
        const { onFinish, onFinishFailed } = this.callbacks
        let err = this.validate()
        if (err.length > 0) {
            // 失败 onFinishFailed
            onFinishFailed(this.getFieldsValue(), err);
        } else {
            // 成功 onFinish()
            onFinish(this.getFieldsValue());
        }

        console.log("submit");
    }
    setCallbacks = (newCallbacks) => {
        this.callbacks = {
            ...this.callbacks,
            ...newCallbacks,
        };
    };
    getForm = () => {
        return {
            getFieldsValue: this.getFieldsValue,
            getFieldValue: this.getFieldValue,
            setFieldsValue: this.setFieldsValue,
            registerFieldEntities: this.registerFieldEntities,
            submit: this.submit,
            setCallbacks: this.setCallbacks,
        }
    }
}