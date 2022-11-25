//go:build go1.10

package main

/*
void SayHello(_GoString_ s);
typedef void (*EventCb)(int e1,char* e2);
static void bridge_event_cb(EventCb cb,int e1,char* e2)
{
	cb(e1,e2);
}
*/
import "C"
import (
	"bytes"
	"encoding/binary"
	"fmt"
	"math/big"
	"unsafe"
)

var jsCb C.EventCb = nil

func main() {
	//C.puts(C.CString("Hello,World\n"))
	//println("hello cgo")
	//C.SayHello(C.CString("Hello,World\n"))
	C.SayHello("Hello,World\n")
}

//export SayHello
func SayHello(s string) {
	fmt.Println(s)
}

//export PrintBye
func PrintBye() {
	fmt.Println("From DLL:Bye!")
	if jsCb != nil {
		fmt.Println("执行回调...")
		C.bridge_event_cb(jsCb, 2, C.CString("胖鱼"))
	}
}

//export Sum
func Sum(a int, b int) int {
	return a + b
}

//export SetCallBack
func SetCallBack(cb C.EventCb) int {
	jsCb = cb
	return 1
}

//export CheckIsPrime
func CheckIsPrime(a int64) bool {
	if big.NewInt(a).ProbablyPrime(0) {
		return true
	}
	return false
}

//export GetArray
func GetArray() unsafe.Pointer {
	var res []int32
	start := 5
	end := 25
	arrLen := end - start
	res = append(res, int32(arrLen))
	for i := 5; i <= 25; i++ {
		res = append(res, int32(i))
	}
	buf := new(bytes.Buffer)
	err := binary.Write(buf, binary.BigEndian, res)
	if err != nil {
		panic(err)
	}
	return C.CBytes(buf.Bytes())
}

////export GetArray
//func GetArray() *[]int16 {
//	//res := [6]int16{2, 3, 5, 7, 11, 13}
//	var res []int16
//	for i := 0; i < 10; i++ {
//		res = append(res, int16(i))
//	}
//	return &res
//}
