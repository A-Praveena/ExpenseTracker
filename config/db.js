const mongoose = require('mongoose');


const dbURI = `mongodb+srv://praveena9915:Pravi123@cluster0.2m0yxug.mongodb.net/Expense`


mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event handlers for the connection
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});
module.exports=db