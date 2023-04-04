import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useState } from 'react'
import { Fragment } from 'react'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
//desctructuring props to get only the workout that is passed in from array in Home
export const WorkoutDetails = ({ workout }) => {

    const [isEdit, setIsEdit] = useState(false)
    const [titleEdit, setTitleEdit] = useState(workout.title)
    const [loadEdit, setLoadEdit] = useState(workout.load)
    const [repsEdit, setRepsEdit] = useState(workout.reps)
    const [dateEdit, setDateEdit] = useState(workout.date)
    const [typeEdit, setTypeEdit] = useState(workout.type)

    // console.log(workout);

    // TODO: set alerts on delete and submit changes
    // TODO: filter workout details by date
    const { dispatch } = useWorkoutsContext()

    const deleteHandler = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })

        const json = await response.json() // the doc that was just deleted

        if (response.ok) { // in case the data was not successfully deleted the context should not be changed
            dispatch({
                type: 'DELETE_WORKOUT',  // dispatch the action to the reducer
                payload: json
            })
        }
    }

    const enableEditHandler = () => {
        console.log('edit handler is enabled');
        setIsEdit(true)

    }

    const confirmEditHandler = async () => {
        console.log('this is the confirm edit handler');

        // console.log(workout);
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'PATCH',
            body: JSON.stringify(
                {
                    title: titleEdit,
                    load: loadEdit,
                    reps: repsEdit,
                    date: dateEdit,
                    type: typeEdit
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        console.log(json);

        if (response.ok) { // in case the data was not successfully deleted the context should not be changed
            dispatch({
                type: 'EDIT_WORKOUT', // dispatch the action to the reducer
                payload: json   /// payload might be for the old object and not the updated
            })
        }

        setIsEdit(false)
    }

    const cancelEditHandler = () => {
        console.log('this is the cancel edit handler');
        setIsEdit(false)
    }

    return (
        <Fragment>
            {isEdit === false &&
                <div className="workout-details">
                    <h4>{workout.title}</h4>

                    <p><strong>Load (kg): </strong> {workout.load}</p>
                    <p><strong>Reps: </strong> {workout.reps}</p>
                    <p>Date: {workout.date}</p>
                    <p>added {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
                    <span onClick={deleteHandler} className='material-symbols-outlined' style={{ display: "inlin-block", marginRight: "50px" }}>delete</span>
                    <span onClick={enableEditHandler} className='material-symbols-outlined' style={{ display: "inline-block" }}>edit</span>

                </div>}
            {isEdit === true &&
                <div className="workout-details">
                            <label className='label'>Title:</label>
                            <input defaultValue={workout.title} onChange={(e) => setTitleEdit(e.target.value)}></input>


                            <label>Type:</label>
                            <select
                                defaultValue={workout.type}
                                onChange={(e) => setTypeEdit(e.target.value)}
                            >
                                <option value=''></option>
                                <option value='legs'>Legs</option>
                                <option value='arms'>Arms</option>
                                <option value='back'>Back</option>
                                <option value='chest'>Chest</option>
                            </select>
                        
                            <label>Load (kg)</label>
                            <input defaultValue={workout.load} onChange={(e) => setLoadEdit(e.target.value)}></input>
                       
                            <label>Reps:</label>
                            <input defaultValue={workout.reps} onChange={(e) => setRepsEdit(e.target.value)}></input>
                      
                            <label>Date:</label>
                            <input defaultValue={workout.date} onChange={(e) => setDateEdit(e.target.value)}></input>
                   

                    <span onClick={cancelEditHandler} className='material-symbols-outlined' style={{ display: "inline-block" }}>close</span>
                    <span onClick={confirmEditHandler} className='material-symbols-outlined' style={{ display: "inlin-block", marginRight: "50px" }}>done</span>


                </div>
            }

        </Fragment>
    )
}