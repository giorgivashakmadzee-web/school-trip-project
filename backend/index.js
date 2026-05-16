const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Trip = require('./models/Trip');
const Booking = require('./models/Booking');
const User = require('./models/User');
require('dotenv').config();

const  app = express();

app.use(cors());
app.use(express.json());

// Serve images folder
app.use('/images', express.static('images'));

const mongoUri = process.env.MONGODB_URI ||
  "mongodb+srv://giorgivashakmadzee_db_user:kWB1la0HsSDf9kTk@cluster0.rdqjyia.mongodb.net/schooltrip?retryWrites=true&w=majority";

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected 🔥'))
  .catch(err => console.error('MongoDB connection error:', err));

// GET
app.get('/trip', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
app.post('/trip', async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST booking
app.post('/booking', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// GET bookings
app.get('/booking', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST signup
app.post('/signup', async (req, res) => {
  try {
    const { name, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const newUser = new User({ name, email });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET check-user
app.get('/check-user', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
