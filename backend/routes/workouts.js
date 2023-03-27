// using express router so that the app has access to the file
// moving the requests router here so it doesn't bloat the server file

const express = require('express')

// import the controller for the requests

const {
    createWorkout,
    getWorkouts, 
    getWorkout,
    deleteWorkout, 
    updateWorkout,
    getMonthlyStats,
    test
} = require('../contollers/workoutController')


//creates an instance of the router
const router = express.Router()


//getting all workouts
router.get('/', getWorkouts) // responds to the /api/workouts/ path in the server file => everything after the /
  

//getting a single workout
// router.get('/:id', getWorkout) // id of the workout; param that changes
 
//get monthly stats
// router.get('/stats', getMonthlyStats)

router.get('/test', test)

//post a new workout; reference to the controller function
router.post('/', createWorkout)

//delete a workout
router.delete('/:id', deleteWorkout)

//update a workout
router.patch('/:id', updateWorkout)


//export routes so they can be accesses from the server file
module.exports = router