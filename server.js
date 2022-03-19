const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const { text } = require('express');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.filter((item) => item.id == req.params.id));
});

app.get('/testimonials/random', (req, res) => {
  let item = db[Math.floor(Math.random() * db.length )];
  res.json(item);
});

app.post('/testimonials', (req, res) => {
  const newData = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  };
  db.push(newData);
  return res.json({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
  const editedTestimonials = db.filter((item) => item.id == req.params.id);
  const indexOfTestimonial = db.indexOf(editedTestimonials);
  const newTestimonials = {
    ...editedTestimonials,
    author: req.body.author,
    text: req.body.text,
  };
  db[indexOfTestimonial] = newTestimonials;
  return res.json({message: 'OK'});
});

app.delete('/testimonials/:id', (req, res) => {
  const editedTestimonials = db.filter((item) => item.id == req.params.id);
  const indexOfTestimonial = db.indexOf(editedTestimonials);
  db.splice(indexOfTestimonial, 1);
  return res.json({message: 'OK'});
});


app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});