'use strict';

/**
 * Threshold promise function
 *
 * @param {Array} tasks - Task list
 * @param {Number} concurrency - Threshold
 * @param {Function|null} generator - Promise generator
 * @return {Promise} -
 */
module.exports = (tasks, concurrency, generator) => {
  concurrency = concurrency || tasks.length;
  const thresholds = [];
  const resolves = [];

  let concurrentOffset = 0;
  do {
    /* eslint-disable no-loop-func */
    (offset => {
      tasks.slice(0, concurrency).forEach((task, index) => {
        task = generator ? generator(task) : task;
        task = task instanceof Promise ?  task : Promise.resolve(task);

        if (!thresholds[index]) {
          thresholds[index] = task.then(result => {
            resolves[index + offset] = result;
            return Promise.resolve();
          });
          return;
        }
        thresholds[index] = thresholds[index].then(() => {
          return task.then(result => {
            resolves[index + offset] = result;
            return Promise.resolve();
          })
        });
      });
    })(concurrentOffset);
    tasks = tasks.slice(concurrency);
    concurrentOffset += concurrency;
    /* eslint-enable no-loop-func */
  } while (tasks.length > 0);

  return Promise.all(thresholds).then(() => resolves);
};
