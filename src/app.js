const express = require('express');
const cors = require('cors');
const router = require('./routes/auth.routes');
const PORT = 1111;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

app.use('/api', router);
app.get('/', (req, res) => {
  res.send('Auth Server');
});

app.listen(PORT, () => {
  console.log('Auth Server listening on port 1111');
});
