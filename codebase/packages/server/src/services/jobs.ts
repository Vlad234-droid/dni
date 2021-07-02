import schedule from 'node-schedule';

const job = schedule.scheduleJob('42 * * * *', () => {
  console.log('The answer to life, the universe, and everything!');
});