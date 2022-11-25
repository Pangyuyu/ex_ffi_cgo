const path = require("path")
const ffi = require("ffi-napi");
const ref = require('ref-napi');

(async function () {
    console.log("立即执行函数")
    // var ArrayType = require('ref-array-napi')
    // var IntArray = ArrayType(ref.types.int16)
    const libm = ffi.Library(path.resolve("./dll/main.dll"), {
        'PrintBye': [ref.types.void, []],
        'Sum': [ref.types.int, [ref.types.int, ref.types.int]],
        'CheckIsPrime': [ref.types.bool, [ref.types.int64]],
        'SetCallBack': [ref.types.int, [ffi.Function(ref.types.void,  // ffi.Function申明类型， 用`'pointer'`申明类型也可以
            [ref.types.int, ref.types.CString])]],
        'GetArray': ['pointer', []],
        // 'GetArray':[IntArray,[]],
        // 'GetJsonStr':[ArrayType(ref.types.CString),[]]
    });
    const uiInfocallback = ffi.Callback(
        ref.types.void,
        [ref.types.int, ref.types.CString],
        (resultCount, resultText) => {
            console.log("回调结果", resultCount, resultText)
        },
    )
    const res = libm.SetCallBack(uiInfocallback)
    console.log("回调注册结果", res)
    console.log("==测试普通方法及回调==")
    libm.PrintBye()


    console.log("==测试有返回值==")
    let a = 2;
    let b = 3;
    const result = libm.Sum(a, b)
    console.log("libm.Sum Result", result)

    console.log("==检测质数==")
    const chRes = libm.CheckIsPrime(97)
    console.log("结果：", chRes)

    console.log("==返回JSON字符串==")
    // const resJs=libm.GetJsonStr()
    // console.log(resJs)

    console.log("==返回数组==")
    const byteLen=4
    const libmPointer = libm.GetArray()
    const view1 = new DataView(libmPointer.buffer, 0, byteLen)
    const len = view1.getInt32(0)    
    const bytesLen=len*byteLen
    const view2 = new DataView(libmPointer.buffer, 4, bytesLen+4);
    let intArr=[]
    for (let i = 0; i <= bytesLen; i = i + byteLen) {
        intArr.push(view2.getInt32(i))
    }
    console.log("长度:",len,";值:[",intArr.join(","),"]")
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