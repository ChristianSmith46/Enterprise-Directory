const { Schema, model } = require('mongoose');

const locationSchema = new Schema(
    {
        id: {
            type: Number,
            primaryKey: true,
            autoIncrement: true
        },
        locationName: {
            type: String,
            required: true
        }
    }
);

const Location = model('Location', locationSchema);

module.exports = Location;