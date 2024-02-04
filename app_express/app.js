const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.EXPOSE_PORT || 3000;

const TARGET_ONE_SVC = process.env.TARGET_ONE_SVC || `localhost:${port}`;
const TARGET_TWO_SVC = process.env.TARGET_TWO_SVC || `localhost:${port}`;

app.get('/', (req, res) => {
  console.error('Hello World');
  res.json({ Hello: 'World' });
});

app.get('/items/:item_id', (req, res) => {
  console.error('items');
  res.json({ item_id: req.params.item_id, q: req.query.q });
});

app.get('/io_task', (req, res) => {
  setTimeout(() => {
    console.error('io task');
    res.send('IO bound task finish!');
  }, 1000);
});

app.get('/cpu_task', (req, res) => {
  for (let i = 0; i < 1000; i++) {
    _ = i * i * i;
  }
  console.error('cpu task');
  res.send('CPU bound task finish!');
});

app.get('/random_status', (req, res) => {
  const statusCodes = [200, 200, 300, 400, 500];
  const randomStatusCode = statusCodes[Math.floor(Math.random() * statusCodes.length)];
  res.status(randomStatusCode);
  console.error('random status');
  res.json({ path: '/random_status' });
});

app.get('/random_sleep', (req, res) => {
  const sleepTime = Math.floor(Math.random() * 6);
  setTimeout(() => {
    console.error('random sleep');
    res.json({ path: '/random_sleep' });
  }, sleepTime * 1000);
});

app.get('/error_test', (req, res) => {
  console.error('got error!!!!');
  throw new Error('value error');
});

app.get('/chain', async (req, res) => {
  console.info('Chain Start');
  await axios.get(`http://localhost:${port}/`);
  await axios.get(`http://${TARGET_ONE_SVC}/io_task`);
  await axios.get(`http://${TARGET_TWO_SVC}/cpu_task`);
  console.info('Chain Finished');
  res.json({ path: '/chain' });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
