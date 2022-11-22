const path = require("path")
const ffi = require("ffi-napi");
const ref = require('ref-napi');

(async function () {
    console.log("立即执行函数")
    const libm = ffi.Library(path.resolve("./dll/main.dll"), {
        'PrintBye': [ref.types.void, []],
        'Sum': [ref.types.int, [ref.types.int, ref.types.int]],
        'CheckIsPrime': [ref.types.bool, [ref.types.int64]],
        'setCallBack': [ref.types.int, [ffi.Function(ref.types.void,  // ffi.Function申明类型， 用`'pointer'`申明类型也可以
            [ref.types.int,ref.types.CString])]]
    });
    const uiInfocallback = ffi.Callback(
        ref.types.void,
        [ref.types.int,ref.types.CString],
        (resultCount,resultText) => {
            console.log("回调结果", resultCount,resultText)
        },
    )
    console.log("before libm.setCallBack")
    const res = libm.setCallBack(uiInfocallback)
    console.log("回调注册结果", res)
    libm.PrintBye()
    
    let a = 2;
    let b = 3;
    const result = libm.Sum(a, b)
    console.log("libm.Sum Result", result)


    for (let i = 2; i < 10; i++) {
        const chRes = libm.CheckIsPrime(i)
        if (chRes) {
            console.log(i)
        }
    }
    await sleep()
    console.log("执行结束...")
})()

function sleep() {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve()
        }, 2000)
    })
}