'use strict';

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();
const parallel = require('../index.js');

const generator = (index) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(index), 500);
  });
};

console.log('Benchmark for 100 tasks by 10 threshold');

suite
.add('promise-parallel', {
  defer: true,
  fn: deferred => {
    const tasks = Array.from(new Array(100), (_, index) => index);
    return parallel(tasks, 10, generator)
      .then(result => deferred.resolve())
    ;
  }
})
.add('Promise.all', {
  defer: true,
  fn: deferred => {
    const tasks = Array.from(new Array(100), (_, index) => index);
    Promise.all(tasks.slice(0, 10).map(generator))
      .then(() => Promise.all(tasks.slice(20, 30).map(generator)))
      .then(() => Promise.all(tasks.slice(30, 40).map(generator)))
      .then(() => Promise.all(tasks.slice(40, 50).map(generator)))
      .then(() => Promise.all(tasks.slice(50, 60).map(generator)))
      .then(() => Promise.all(tasks.slice(60, 70).map(generator)))
      .then(() => Promise.all(tasks.slice(70, 80).map(generator)))
      .then(() => Promise.all(tasks.slice(80, 90).map(generator)))
      .then(() => Promise.all(tasks.slice(90).map(generator)))
      .then(() => deferred.resolve())
    ;
  }
})
.on('cycle', evt => {
  console.log(evt.target.toString());
})
.on('complete', function() {
  console.log(`Fastest is ${this.filter('fastest').map('name')}`);
})
.run({'async': true});

