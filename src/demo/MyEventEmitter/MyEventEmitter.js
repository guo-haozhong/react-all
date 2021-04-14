/**
 * 发布-订阅模型编码实现
 * on()：负责注册事件的监听器，指定事件触发时的回调函数
 * emit()：负责触发事件，可以通过传参使其在触发的时候携带数据 
 * off()：负责监听器的删除
 */

class MyEventEmitter {
    constructor() {
        //用来存储事件和监听函数之间的关系
        this.eventMap = {}
    }
    on(eventName, callback) {
        //callback必须是函数
        if (!(callback instanceof Function)) {
            throw new Error('callback is not a funtion')
        }
        //判断eventName事件对应的队列是否存在
        if (!this.eventMap[eventName]) {
            this.eventMap[eventName] = []
        }

        this.eventMap[eventName].push(callback)
        console.log('this.eventMap', this.eventMap);
    }

    emit(eventName, ...args) {
        //如果有订阅
        if (this.eventMap[eventName]) {
            for (let i = 0; i < this.eventMap[eventName].length; i++) {
                this.eventMap[eventName][i](...args)
            }
        }
    }

    off(eventName, callback) {
        if (this.eventMap[eventName]) {
            const index = this.eventMap[eventName].indexOf(callback)
            this.eventMap[eventName].splice(index, 1)
        }
    }
}

const myEvent = new MyEventEmitter();
myEvent.on("test", (args) => {
    console.log('监听test事件', args);
});
myEvent.on("test1", (...args) => {
    console.log('监听test1事件', ...args);
});

myEvent.emit("test", "data1");
myEvent.emit("test1", "data1", 'data2');

myEvent.off('test', (args) => {
    console.log('卸载test事件', args);
})