# node调用Golang动态库

## go编译为dll

```shell
go build -o ..\ex_node\dll\main.dll -buildmode=c-shared main.go
```

## go的编译模式

- buildmode=archive  
  >把源文件编译成Go语言得静态库文件，如果包名为main会被忽略掉
- buildmode=c-archive  
  >这个命令可以把你的Go源文件编译成C语言可以使用的静态库，也就是.a文件，C语言程序就可以使用你用Go语言编写的程序了
- buildmode=c-shared  
  >c-开头的说明他们都是可以被C语言程序调用，这里的命令可以把Go源文件编译成C语言可以使用的动态库文件，也就是.so文件或者.dll文件
- buildmode=default  
  >就是默认编译方式
- buildmode=shared  
  >这个是把Go源文件编译成Go语言可以使用的静态库文件，C语言不能使用，它将非main的package编译为动态链接库，并在构建其他 Go程序时使用 -linkshared 参数来指定，
编译Go动态库go install -buildmode=shared std，需要注意的是-buildmode=shared暂不支持macOS，使用Go动态库go build -linkshared hello.go
- buildmode=exe  
  >编译成.exe文件，包名为main的忽略
- buildmode=pie  
  >编译带上这个参数可以让你的Go程序更安全，没法反编译，即使反编译了也看不懂
- buildmode=plugin:Go插件
  >plugin 模式是 golang 1.8 才推出的一个特殊的构建方式，它将 package main 编译为一个 go 插件，并可在运行时动态加载。可以理解为Go语言的动态库，当然C语言不能使用

## 参考资料

- [node-ffi 调用Golang动态库](https://blog.csdn.net/qq_22656473/article/details/106526584)
- [node-ffi使用指南](https://zhuanlan.zhihu.com/p/40526242)
- [cgo传递回调函数](https://monkeywie.cn/2021/04/26/cgo-pass-callback/)
- [第2章 CGO编程](https://books.studygolang.com/advanced-go-programming-book/ch2-cgo/readme.html)
- [Golang的构建模式](https://chenjiehua.me/golang/golang-buildmode.html#:~:text=Golang%E7%9A%84%E6%9E%84%E5%BB%BA%E6%A8%A1%E5%BC%8F%201%20buildmode%20%E4%B8%80%E8%A7%88%20%E5%9C%A8%20go%20build%20%E5%92%8C,Go%E5%8A%A8%E6%80%81%E9%93%BE%E6%8E%A5%E5%BA%93%20%E8%AF%B4%E6%98%8E%EF%BC%9A%20...%205%20plugin%20Go%E6%8F%92%E4%BB%B6%20%E8%AF%B4%E6%98%8E%EF%BC%9A%20)
- [Go语言编译模式浅谈](https://blog.csdn.net/HughNian/article/details/112355142)
- [ffi-napi 调用本地动态库](https://blog.csdn.net/dysengor/article/details/118576702)
- [CGO Types](https://www.cnblogs.com/majianguo/p/7650059.html)
- [int16切片如何优雅转成byte切片？](https://learnku.com/go/t/73473)
