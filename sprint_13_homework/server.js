require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectToDatabase } = require('./db');
const Goods = require("./models/Goods");

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectToDatabase();

// Routes
app.get('/', async (req, res) => {
  try {
    const documents = await Goods.find({ show: { $ne: false}});
    
    res.render('index', { 
      title: 'CRUD App', 
      message: 'All documents from MongoDB:',
      documents
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).render('index', {
      title: 'Error',
      message: 'Something went wrong while fetching documents.',
      documents: []
    });
  }
});

app.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create Document',
    action: 'create'
  });
});

app.post('/create', async (req, res) => {
  try {
    const newDocument = new Goods({
      title: req.body.title,
      url: req.body.url,
      image: req.body.image,
      price: parseFloat(req.body.price),
      stock: parseInt(req.body.stock)
    }); 
    
    const result = await newDocument.save();
    console.log('Document inserted:', result._id);
    res.redirect('/');
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).render('create', {
      title: 'Create Document',
      error: 'Error creating document. Please try again.'
    });
  }
});

app.get('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send('ID is required');
    }
    
    const document = await Goods.findById(id);
    
    if (!document) {
      return res.status(404).send('Document not found');
    }
    
    res.render('update', {
      title: 'Update Document',
      doc: document,
      action: 'update'
    });
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).send('Error fetching document');
  }
});

app.post('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).send('ID is required');
    }
    
    const updateData = {
      title: req.body.title,
      url: req.body.url,
      image: req.body.image,
      price: parseFloat(req.body.price),
      stock: parseInt(req.body.stock)
    };
    
    const result = await Goods.findByIdAndUpdate(id, updateData, {new: true, runValidators: true});
    
    if (!result) {
      return res.status(404).send('Document not found');
    }
    
    console.log('Document updated:', id);
    res.redirect('/');
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).send('Error updating document');
  }
});

app.post('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).send('ID is required');
    }


    const result = await Goods.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send('Document not found');
    }
    
    console.log('Document deleted:', id);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).send('Error deleting document');
  }
});

app.post('/safe-delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).send('ID is required');
    }

    const result = await Goods.findByIdAndUpdate(id, { $set: { show: false } }, { new: true });

    if (!result) {
      return res.status(404).send("Document not found");
    };

    console.log('Document soft deleted (show=false):', id);
    res.redirect('/');
  } catch (error) {
    console.error('Error soft deleting document:', error);
    res.status(500).send('Error soft deleting document');
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
