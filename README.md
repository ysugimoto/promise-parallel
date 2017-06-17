# promise-threshold

[![Build Status](https://travis-ci.org/ysugimoto/promise-threshold.svg?branch=master)](https://travis-ci.org/ysugimoto/promise-threshold)

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

## Benchmark example

```shell
$ git clone https://github.com/ysugimoto/promise-threshold.git
$ cd promise-threshold
$ npm install
$ npm run bench

Benchmark for 100 tasks by 10 threshold
promise-threshold x 1.98 ops/sec ±0.23% (14 runs sampled)
Promise.all x 0.22 ops/sec ±0.15% (6 runs sampled)
```

## Licence

MIT

## Author

Yoshiaki Sugimoto <sugimoto@wnotes.net>
