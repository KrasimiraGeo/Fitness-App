
//desctructuring props to get only the workout that is passed in from array in Home
export const WorkoutDetails = ({ workout }) => {

    const handleDelete = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })

        const json = await response.json() // the doc that was just deleted

        if(response.ok){ // in case the data was not successfully deleted the context should not be changed

        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong> {workout.load}</p>
            <p><strong>Reps: </strong> {workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleDelete}>Delete</span>
        </div>
    )
}