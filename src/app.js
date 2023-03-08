import express from 'express';
import router from './routes/auth.routes';
const PORT = 1111;

const app = express();
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
  console.log('Auth Server listening on port 1111');
});
