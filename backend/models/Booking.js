const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    students: Number,
    parents: Number,
    teachers: Number,
    destination: String,
    menu: String,
    totalPeople: Number,
    transportCost: Number,
    foodCost: Number,
    totalCost: Number,
    userEmail: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);