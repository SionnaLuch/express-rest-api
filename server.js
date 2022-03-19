const express = require('express');
const app = express();
const cors = reqiure('cors');

const testimonialsRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.listen(8009, () => {
  console.log('Server is running on port: 8009');
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({message: '404 not found...'});
});