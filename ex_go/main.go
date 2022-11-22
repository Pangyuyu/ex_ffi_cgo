package main

/*
typedef void (*EventCb)(int e1,char* e2);
static void bridge_event_cb(EventCb cb,int e1,char* e2)
{
	cb(e1,e2);
}
*/
import "C"
import (
	"fmt"
	"math/big"
)

var jsCb C.EventCb = nil

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

//export setCallBack
func setCallBack(cb C.EventCb) int {
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

func main() {
	fmt.Println("hello world!")
}
