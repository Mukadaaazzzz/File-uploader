const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Basic configuration
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API endpoint for file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, mimetype, size } = req.file;
  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
