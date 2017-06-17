# promise-parallel

`promise-parallel` supplies more faster way to execute a lot of concurrency tasks than `Promise.all()`.

## Installation

```shell
$ npm install promise-parallel
```

## Usage

```js
const parallel = require('promise-parallel');

const tasks = [
  ... task list which you need
];
const threshold = 10; // This means executed per 10 task
const generator = (task) => {
  return new Promise((resolve) => {
    // some async task
  });
};

parallel(tasks, threshold, generator)
  .then(resuls => {
    console.log(results); // ordered results properly
  })
;
```

## Benchmark

```shell
$ git clone https://github.com/ysugimoto/promise-parallel.git
$ cd promise-parallel
$ npm install
$ npm run bench
```

## Licence

MIT

## Author

Yoshiaki Sugimoto <sugimoto@wnotes.net>
