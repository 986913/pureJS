function fakeAjax(url, cb) {
  var fake_responses = {
    file1: 'The first text',
    file2: 'The middle text',
    file3: 'The last text',
  };
  var randomDelay = (Math.round(Math.random() * 1e4) % 8000) + 1000;

  console.log('Requesting: ' + url);

  setTimeout(function () {
    cb(fake_responses[url]); // 这里的cb就是对应promise里的resolve,  并且cb的参数对应上了下面then的参数
  }, randomDelay);
}

function output(text) {
  console.log(text);
}

// **************************************

function getFile(file) {
  return new Promise((resolve) => {
    fakeAjax(file, resolve);
  });
}

// Request all files at once in "parallel" via `getFile(..)`.
var p1 = getFile('file1');
var p2 = getFile('file2');
var p3 = getFile('file3');

// Render as each one finishes, but only once previous rendering is done.
p1.then((res) => {
  console.log(`.then res para is -- ${res}`);
  output(res);
})
  .then((res) => {
    console.log(`.then res para is -- ${res}`); // the reson here res is undefined, it's because last then didn't return anything
    return p2; // chain promise here, return new promise
  })
  .then((res) => {
    console.log(`.then res para is -- ${res}`);
    output(res);
  })
  .then((res) => {
    console.log(`.then res para is -- ${res}`); // the reson here res is undefined, it's because last then didn't return anything
    return p3; // chain promise here, return new promise
  })
  .then((res) => {
    console.log(`.then res para is -- ${res}`);
    output(res);
  })
  .then((res) => {
    console.log(`.then res para is -- ${res}`); // the reson here res is undefined, it's because last then didn't return anything
    output('Complete!');
  });

/*
  p1.then(output)
    .then(() => p2) // chain promise here, return new promise
    .then(output)
    .then(() => p3) // chain promise here, return new promise
    .then(output)
    .then(() => {
      output('Complete!');
    });
*/
