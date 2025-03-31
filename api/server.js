const express = require('express');
const cors = require('cors');
const app = express();
const { json } = require('express');
const port = 3001;

app.use(cors());
app.use(json());

// Routes :
const pcfRoutes = require('./src/routes/pcfRouter');
app.use('/api', pcfRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
