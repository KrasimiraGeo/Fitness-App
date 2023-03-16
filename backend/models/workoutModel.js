//create a schema for the data
//MongoDB is schemaless

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({  //first argument describes how the schema for the data looks
    title: {
        type: String,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    load: {
        type: Number,
        required: true,
    }
}, { timestamps: true })  // when creating new document it gives them a timestamps prop automatically

//Model - apply data to the schema

module.exports = mongoose.model('Workout', workoutSchema)  //creates a model
