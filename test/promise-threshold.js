'use strict';

const expect = require('chai').expect;
const threshold = require('../index.js');

const generator = (index) => {
  const wait = (Math.floor(Math.random() * 9) + 1) * 100;
  return new Promise(resolve => {
    setTimeout(() => resolve(index), wait);
  });
};

describe('promise-threshold', () => {

  it('should return task order result properly', () => {
    const tasks = Array.from(new Array(10), (_, index) => index);
    return threshold(tasks, 4, generator)
      .then(result => {
        for (let i = 0 ; i < result.length; i++) {
          expect(result[i]).to.be.equal(i);
        }
      });
  });

  it('should return result even if generator didn\'t supplied', () => {
    const tasks = Array.from(new Array(10), (_, index) => index);
    return threshold(tasks, 4)
      .then(result => {
        for (let i = 0 ; i < result.length; i++) {
          expect(result[i]).to.be.equal(i);
        }
      });
  });
});
