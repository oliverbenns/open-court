import app from './app';

const port = 8080;

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
