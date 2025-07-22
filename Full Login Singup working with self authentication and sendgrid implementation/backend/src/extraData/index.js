// const express = require('express');
// const app = express();
// const port = 3000;

// app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`second middleware ${req.method} request for '${req.url}'`);
//   next();
// })
// app.use((req, res, next) => {
//   console.log(" Third Middleware");
//   next();
// })

// // GET
// app.get('/', (req, res) => {
//   res.send('GET request successful!');
// });

// // POST
// app.post('/api/post', (req, res) => {
//   res.json({ message: 'POST request received', body: req.body });
// });

// // PUT
// app.put('/api/put/:id', (req, res) => {
//   res.json({ message: `PUT request to update ID ${req.params.id}`, body: req.body });
// });

// // DELETE
// app.delete('/api/delete/:id', (req, res) => {
//   res.json({ message: `Deleted item with ID ${req.params.id}` });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
