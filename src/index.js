const app = require('./app');

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
