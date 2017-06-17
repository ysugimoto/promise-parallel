# promise-threshold

`promise-threshold` supplies more faster way to execute a lot of concurrency tasks than `Promise.all()`.

## Installation

```shell
$ npm install promise-threshold
```

## Usage

```js
const threshold = require('promise-threshold');

const tasks = [
  ... task list which you need
];
const concurrency = 10; // This means executed per 10 task
const generator = (task) => {
  return new Promise((resolve) => {
    // some async task
  });
};

threshold(tasks, concurrency, generator)
  .then(resuls => {
    console.log(results); // ordered results properly
  })
;
```

## Benchmark

```shell
$ git clone https://github.com/ysugimoto/promise-threshold.git
$ cd promise-threshold
$ npm install
$ npm run bench
```

## Licence

MIT

## Author

Yoshiaki Sugimoto <sugimoto@wnotes.net>
