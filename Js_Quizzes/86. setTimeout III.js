let func = () => {
  console.log(1);
};
//1. this is queued in task queue
//3. `func` starts pointing to new callable object
setTimeout(() => {
  func = () => {
    console.log(2);
  };
}, 0);

//2. this is queued in task queue
//4. callback definition of this function doesn't change. It remain 
// same whatever was passed initially. Thus it prints `1`
setTimeout(func, 100);