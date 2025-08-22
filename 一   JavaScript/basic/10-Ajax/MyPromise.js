const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(executor) {
  this.status = PENDING;

  this.value = undefined
  this.reason = undefined;

  this.resolveCallbacks = [];
  this.rejectCallbacks = [];


  function resolve(value){
    run(FULFILLED,value);
  };

  function reject(reason){
    run(REJECTED,reason);
  };

  //改为箭头函数,this指向MyPromise实例
  const run = (status,result) => {
    setTimeout(()=>{
      if(this.status === PENDING){
        this.status = status;
        if (status === FULFILLED) {
          this.value = result;
          this.resolveCallbacks.forEach(callback => {
            callback();
          });
        } else if (status === REJECTED) {
          this.reason = result;
          this.rejectCallbacks.forEach(callback => {
            callback();
          });
        }
      }
    });
  }


  //如果函数内部有异常,为避免崩溃,rejet报出错误
  try {
    executor(resolve.bind(this),reject.bind(this));
  }catch(error){
    reject(error);
  }

}

//then 是 安排后续要执行的操作",但操作是你自己写入的
//then 成功执行一个函数 失败执行一个函数
MyPromise.prototype.then = function(onFulfilled,onRejected){

  //确保onFulfilled和onRejected都是函数(防止用户没有传回调函数)
  const onFulfilledCallback = typeof onFulfilled === 'function'?
  onFulfilled:function(value){return value};
  const onRejectedCallback = typeof onRejected === 'function'?
  onRejected:function(error){throw error};


  
  const promise = new MyPromise((resolve,reject)=>{

    //then是微任务,需要放到下一个事件循环中执行(setTimeout)
    setTimeout(()=>{
      if(this.status === PENDING){
        //Pending状态,是因为还没有执行成功或者失败(异步操作),需要将回调函数放到数组中,等待状态改变时执行
        //箭头函数的this指向MyPromise实例
        this.resolveCallbacks.push(()=>{
          const result = onFulfilledCallback(this.value);
          resolvePromise(promise,result,resolve,reject);
        })
        this.rejectCallbacks.push(()=>{
          const result = onRejectedCallback(this.reason);
          resolvePromise(promise,result,resolve,reject);
        })
      }else if(this.status === FULFILLED){
        try{
          // 接收上一个Promise的成功结果,执行成功回调函数,返回一个新的Promise对象
          const result = onFulfilledCallback(this.value);
          //检验A+规范
          resolvePromise(promise,result,resolve,reject);
        }catch(error){
          reject(error);
        }
      }else if(this.status === REJECTED){
        try{
          // 接收上一个Promise的失败结果,执行失败回调函数,返回一个新的Promise对象
          const result = onRejectedCallback(this.reason);
          //检验A+规范
          resolvePromise(promise,result,resolve,reject);
        }catch(error){
          reject(error);
        }
      }
    }) 
  })


  //为保证链式调用,返回一个新的Promise对象
  return promise;
}

//处理then返回的Promise对象
function resolvePromise(promise,result,resolve,reject){
  if(promise === result){
    reject(new TypeError('Chaining cycle detected for promise'));
  }else if(result instanceof MyPromise){
    //如果返回的是Promise对象,需要得到成功或者失败结果,并执行回调函数
    if(result.status === PENDING){
      result.then((value)=>{
        //递归调用,防止不断返回新的Promise对象
        resolvePromise(promise,value,resolve,reject)
      },(error)=>{
        reject(error)
      })
    }
    else if(result.status === FULFILLED){
      resolve(result.value);
    }else if(result.status === REJECTED){
      reject(result.reason);
    }
  }else if(result && typeof result === 'object' || typeof result === 'function'){
    let then;
    try {
      then = result.then;
    } catch (error) {
      reject(error);
      return;
    }
    if(typeof then === 'function'){
      //如果是函数,则调用then方法,得到成功或者失败结果,并执行回调函数
      //onFulfilled 和 onRejected 只能调用其中一个（不能同时调用）。
      let called = false;//防重复调用标志
      try {
        //确保 this 指向 result 本身
        then.call(result,(value)=>{
          if(!called){
            called = true;
            resolvePromise(promise,value,resolve,reject)
          }
        },(error)=>{
          if(!called){
            called = true;
            reject(error)
          }
        })
      } catch (error) {
        if(!called){
          reject(error);
        }
      }
    }else{
      resolve(result);
    }
  }else{
    resolve(result);
  }
}

MyPromise.prototype.catch = function(onRejected){
  return this.then(undefined,onRejected);
}
MyPromise.prototype.finally = function(onFinally){
  return this.then((value)=>{
    onFinally();
    return value;
  },(error)=>{
    onFinally();
    throw error;
  })
}

MyPromise.resolve = function(value){
  if(value instanceof MyPromise){
    return value;
  }
  return new MyPromise((resolve) => {
    //如果是thenable对象,需要调用then方法,得到成功或者失败结果,并执行回调函数
    if(value && (typeof value === 'object' || typeof value === 'function')){
      try {
        let then = value.then;
        if(typeof then === 'function'){
          then.call(
            value,
            (value)=>resolve(value),
            (error)=>reject(error)
          )
        }
      } catch (error) {
        reject(error);
        return;
      }
    }
    resolve(value);
  });
}

MyPromise.reject = function(reason){
  return new MyPromise((resolve,reject) => {
    reject(reason);
  });
}





// 1. 同步 resolve 测试
const p1 = new MyPromise((resolve) => {
  resolve('同步成功');
});

p1.then((value) => {
  console.log('测试1 - 同步resolve:', value === '同步成功' ? '✓ 通过' : '✗ 失败');
});

// 2. 同步 reject 测试
const p2 = new MyPromise((resolve, reject) => {
  reject('同步失败');
});

p2.then(null, (reason) => {
  console.log('测试2 - 同步reject:', reason === '同步失败' ? '✓ 通过' : '✗ 失败');
});

// 3. 异步 resolve 测试
const p3 = new MyPromise((resolve) => {
  setTimeout(() => resolve('异步成功'), 100);
});

p3.then((value) => {
  console.log('测试3 - 异步resolve:', value === '异步成功' ? '✓ 通过' : '✗ 失败');
});

// 4. 异步 reject 测试
const p4 = new MyPromise((resolve, reject) => {
  setTimeout(() => reject('异步失败'), 100);
});

p4.then(null, (reason) => {
  console.log('测试4 - 异步reject:', reason === '异步失败' ? '✓ 通过' : '✗ 失败');
});

// 5. 链式调用测试
const p5 = new MyPromise((resolve) => {
  resolve(1);
});

p5
  .then((value) => {
    console.log('测试5.1 - 第一个then:', value === 1 ? '✓ 通过' : '✗ 失败');
    return value + 1;
  })
  .then((value) => {
    console.log('测试5.2 - 第二个then:', value === 2 ? '✓ 通过' : '✗ 失败');
  });

// 6. 链式 then 错误捕获测试
const p6 = new MyPromise((resolve) => {
  resolve(1);
});

p6
  .then((value) => {
    throw new Error('测试错误');
  })
  .then(null, (error) => {
    console.log('测试6 - 错误捕获:', error.message === '测试错误' ? '✓ 通过' : '✗ 失败');
  });

// 7. 链式 then 穿透测试
const p7 = new MyPromise((resolve) => {
  resolve(1);
});

p7
  .then()
  .then((value) => {
    console.log('测试7 - 值穿透:', value === 1 ? '✓ 通过' : '✗ 失败');
  });

// 8. 返回 Promise 测试
const p8 = new MyPromise((resolve) => {
  resolve(1);
});

p8
  .then((value) => {
    return new MyPromise((resolve) => resolve(value + 1));
  })
  .then((value) => {
    console.log('测试8 - 返回Promise:', value === 2 ? '✓ 通过' : '✗ 失败');
  });

// 9. 返回 thenable 对象测试
const p9 = new MyPromise((resolve) => {
  resolve(1);
});

p9
  .then((value) => {
    return {
      then: (resolve) => resolve(value + 1)
    };
  })
  .then((value) => {
    console.log('测试9 - 返回thenable:', value === 2 ? '✓ 通过' : '✗ 失败');
  });

// 10. executor 同步错误测试
const p10 = new MyPromise(() => {
  throw new Error('executor错误');
});

p10.then(null, (error) => {
  console.log('测试10 - executor同步错误:', error.message === 'executor错误' ? '✓ 通过' : '✗ 失败');
});

// 11. then 回调错误测试
const p11 = new MyPromise((resolve) => {
  resolve(1);
});

p11
  .then(() => {
    throw new Error('then回调错误');
  })
  .then(null, (error) => {
    console.log('测试11 - then回调错误:', error.message === 'then回调错误' ? '✓ 通过' : '✗ 失败');
  });

// 12. 多次 then 调用测试
const p12 = new MyPromise((resolve) => {
  setTimeout(() => resolve('多次调用'), 100);
});

const results = [];
p12.then((value) => results.push(value + 1));
p12.then((value) => results.push(value + 2));

setTimeout(() => {
  console.log('测试12 - 多次then调用:', 
    results.length === 2 && results[0] === '多次调用1' && results[1] === '多次调用2' 
    ? '✓ 通过' : '✗ 失败');
}, 200);

// 测试 MyPromise.resolve
const p13 = MyPromise.resolve('直接值');
p13.then(v => console.log('测试13:', v === '直接值' ? '✓ 通过' : '✗ 失败'));

const p14 = MyPromise.resolve(new MyPromise(res => res('嵌套Promise')));
p14.then(v => console.log('测试14:', v === '嵌套Promise' ? '✓ 通过' : '✗ 失败'));

const thenable = {
  then: function(resolve) {
    resolve('thenable值');
  }
};
const p15 = MyPromise.resolve(thenable);
p15.then(v => console.log('测试15:', v === 'thenable值' ? '✓ 通过' : '✗ 失败'));

// 测试 MyPromise.reject
const p16 = MyPromise.reject('错误原因');
p16.then(null, e => console.log('测试16:', e === '错误原因' ? '✓ 通过' : '✗ 失败'));

const p17 = MyPromise.reject(new Error('错误对象'));
p17.then(null, e => console.log('测试17:', e.message === '错误对象' ? '✓ 通过' : '✗ 失败'));