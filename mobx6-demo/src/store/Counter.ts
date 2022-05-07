import {
  autorun,
  // action,
  // computed,
  makeAutoObservable,
  reaction,
  runInAction,
  // makeObservable,
  // observable,
} from "mobx";

class Counter {
  counter = 0;
  constructor() {
    //......
    //makeObservable写法
    //参数1： 指定谁变成响应式
    //参数2：指定哪些属性或者方法变成可观察的
    // makeObservable(this, {
    //   counter: observable, //counter是可观察的
    //   increment: action, //修改counter的方法是个action
    //   resset: action,
    //   decrement: action.bound,
    //   double: computed,
    // });
    //..........

    //
    makeAutoObservable(this, {}, { autoBind: true });
  }
  //   increment() {
  //     this.counter++;
  //   }
  //increment异步写法
  increment() {
    setTimeout(() => {
      runInAction(() => {
        //等价于在action里面改的
        this.counter++;
      });
    }, 1000);
  }
  resset() {
    this.counter = 0;
  }
  decrement() {
    this.counter--;
  }
  get double() {
    return this.counter * 2;
  }
}

const counter = new Counter();

autorun(() => {
  //监听每次counter的变化
  console.log("counter.counter", counter.counter);
});
reaction(
  () => counter.counter,
  (value, oldvalue) => {
    console.log("counter变化了", oldvalue);
  }
);
export default counter;