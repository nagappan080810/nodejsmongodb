function* foo() {
  yield 1
  const args = yield 2
  console.log(args)
}
var fooIterator = foo()
console.log(fooIterator.next().value) // will log 1
console.log(fooIterator.next().value) // will log 2
fooIterator.next("value") // will log the console.log inside the generator 'aParam'