import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ debug: false });


const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('bookosaurs');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
