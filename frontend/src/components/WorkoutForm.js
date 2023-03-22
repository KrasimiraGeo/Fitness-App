import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { Calendar } from './Calendar'

export const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext()
    const [emptyFields, setEmptyFields] = useState([])

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [type, setType] = useState('')
    const [error, setError] = useState('')


    console.log(emptyFields)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const empty = []
        const workout = { title, load, reps, type }
        console.log(workout)

        console.log(emptyFields.length)

        console.log(workout.reps === '')

        if (title === '') {
            empty.push('title')
        }
        if (type === '') {
            empty.push('type')
        }
        if (reps === '') {
            empty.push('reps')
        }
        if (load === '') {
            empty.push('load')
        }

        if (empty.length > 0) {
            setEmptyFields(empty)
            setError('Please fill in all the fields!')
        }

        console.log(empty)
        console.log(emptyFields)


        if (empty.length === 0) {
            setError('')
            const response = await fetch('/api/workouts', {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log(response)

            const json = await response.json()

            console.log(json)

            if (!response.ok) {
                console.log(response)
                setError(json.error) // we have an error property on the json in the backend;
                setEmptyFields(json.emptyFields)
            }

            if (response.ok) {
                setTitle('')
                setLoad('')
                setReps('')
                setError(null)
                setEmptyFields([])
                setType('')
                console.log('new workout added', json)
                dispatch({ // updating the state in the context to cause a re-render of the workouts list
                    type: 'CREATE_WORKOUT',
                    payload: json
                })
            }
        }

    }

    console.log(emptyFields)

    return (
        <form className='create' onSubmit={handleSubmit}>

            <h3>Add a new workout</h3>

            <div className='calendar-wrapper'>
                <Calendar />
            </div>


            <label>Exercise type</label>
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={emptyFields.includes('type') ? 'error' : ''}
            >
                <option value=''></option>
                <option value='legs'>Legs</option>
                <option value='arms'>Arms</option>
                <option value='back'>Back</option>
                <option value='chest'>Chest</option>
            </select>


            <label>Title</label>
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (kg)</label>
            <input
                type='number'
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps</label>
            <input
                type='number'
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )

}