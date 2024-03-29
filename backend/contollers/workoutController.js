// functions that we reference in the workour file 
// to fullfill all requests
// import the model to interact with the db 

//import data model
const Workout = require('../models/workoutModel')

const mongoose = require('mongoose')
// const { default: daysToWeeks } = require('date-fns/daysToWeeks')


// get all workouts
const getWorkouts = async (req, res) => {

    let id = req.query['id']

    if (id) {
        if (!mongoose.Types.ObjectId.isValid(id)) { //checks if the id we have is valid as it is a mongo object type
            return res.status(404).json({ error: 'Input data is not valid' })

        }
        const workout = await Workout.findById(id)
        if (!workout) { // expects a certain tyoe or length; when length is met but id is nonexistent the error is returned
            return res.status(400).json({ error: 'No such workout' })
        }

        res.status(200).json(workout)

    } else {
        const workouts = await Workout.find({}).sort({ createdAt: -1 }) // get all docs sorted from th enewest
        // sending data to the client
        res.status(200).json(workouts)
    }


}

// get a single workout 

const getWorkout = async (req, res) => {
    const { id } = req.params
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) { //checks if the id we have is valid as it is a mongo object type
        return res.status(404).json({ error: 'No such workout' })

    }
    const workout = await Workout.findById(id)
    if (!workout) { // expects a certain tyoe or length; when length is met but id is nonexistent the error is returned
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)

}

// create a new workout
const createWorkout = async (req, res) => {
    //post a new workout

    console.log(req.body)
    // add doc do db
    const { title, load, reps, type, date } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (!type) {
        emptyFields.push('type')
    }
    if (!date) {
        emptyFields.push('date')
    }

    console.log(emptyFields.length)

    if (emptyFields.length > 0) {  // if there is an empty field do not continue with the reqeust
        return res.status(400).json({
            error: 'Please fill in all the fields!',
            emptyFields
        })
    }


    try {
        //async -> store the response inside workout const
        const workout = await Workout.create({ title, load, reps, type, date })
        console.log(workout)
        res.status(200).json(workout)
    } catch (error) {    ///Mongoose validator error
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}

// update a workout

const updateWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body //spread the body of the request, there should be a field that is to be updated
    }, { new: true })

    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}

const getMonthlyStats = async (req, res) => {

    // TODO: req - time range 
    // {"date":{$gt: "2023-03-23", $lt: "2023-04-22"}}

    console.log(req.params);

    try {
        const ltDate = new Date (req.params.date); // gets the full date 2023-04-03 // convert string to date object
        const gteDate = new Date(ltDate.getTime()- 7 * 24 * 60 * 60 * 1000) // calculate 7 days back from the lt Date
       
        const from = gteDate.toISOString().split('T')[0]
        const to = ltDate.toISOString().split('T')[0]
       
        const workouts = await Workout.find(
            { "date" : {
                $gte: from,
                $lte: to
            }
          
        });
    
        res.status(200).json(workouts);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
    

}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
    getMonthlyStats,
    
}