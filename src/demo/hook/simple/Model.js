import { useEffect, useState } from 'react'

function Model({ initialState, actions }) {
    console.log(initialState, actions);
    let state = initialState;
    let actionNew = {};
    let queue = []

    Object.keys(actions).forEach((name) => {
        actionNew[name] = (...args) => {
            state = actions[name](...args);
            onDataChange();
        }
    });

    function onDataChange() {
        const queues = [].concat(queue);
        queues.forEach((setState) => {
            setState(state); // 通知所有的组件数据变化
        });
    }

    return function useModel() {
        const [, setState] = useState();
        // 使用useEffect实现发布订阅
        useEffect(() => {
            const index = queue.length;
            queue.push(setState); // 订阅
            return () => { // 组件销毁时取消
                queue.splice(index, 1);
            };
        });
        return [state, actionNew];
    }
}

const useModel = Model({
    initialState: { name: 'hozan' },
    actions: {
        changeName(name) {
            return { name };
        }
    }
});

export default useModel