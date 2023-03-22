import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
//desctructuring props to get only the workout that is passed in from array in Home
export const WorkoutDetails = ({ workout }) => {

    const {dispatch} = useWorkoutsContext()

    const handleDelete = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })

        const json = await response.json() // the doc that was just deleted

        if(response.ok){ // in case the data was not successfully deleted the context should not be changed
            dispatch({
                type:'DELETE_WORKOUT',  // dispatch the action to the reducer
                payload: json
            })
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong> {workout.load}</p>
            <p><strong>Reps: </strong> {workout.reps}</p>
            <p>added {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span onClick={handleDelete} className='material-symbols-outlined'>delete</span>
        </div>
    )
}