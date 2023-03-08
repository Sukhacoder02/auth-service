import express from 'express';
const PORT = 1111;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log('Auth Server listening on port 1111');
});
