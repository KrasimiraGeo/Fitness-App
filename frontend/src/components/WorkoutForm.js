import { useState, useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { Calendar } from './Calendar'

export const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext()
    const [emptyFields, setEmptyFields] = useState([])

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [type, setType] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const empty = []
        const workout = { title, load, reps, type, date }
        const currentDate= new Date().toISOString().split('T')[0]

        if (date === '') {
            setDate(currentDate)
        }
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
        

        console.log(workout);

        if (empty.length > 0) {
            setEmptyFields(empty)
            setError('Please fill in all the fields!')
        }


        if (empty.length === 0) {
            setError('')
            const response = await fetch('/api/workouts', {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json()

            if (!response.ok) {
                setError(json.error) // we have an error property on the json in the backend;
                setEmptyFields(json.emptyFields)
            }

            if (response.ok) {
                setTitle('')
                setLoad('')
                setReps('')
                setDate('')
                setError(null)
                setEmptyFields([])
                setType('')
                dispatch({ // updating the state in the context to cause a re-render of the workouts list
                    type: 'CREATE_WORKOUT',
                    payload: json
                })
            }
        }

    }

    const handleDateChange = (selectedDate) => {
        console.log(selectedDate);
        setDate(selectedDate)
    }

    return (
        <div className='create'>
        <form  onSubmit={handleSubmit}>

            <h3>Add a new workout</h3>

            <div className='calendar-wrapper'>
                <Calendar selectDate={handleDateChange} />
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
        </div>
    )

}