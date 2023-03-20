import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

export const WorkoutForm = () => {

    const {dispatch} = useWorkoutsContext()
    const [emptyFields, setEmptyFields] = useState([])

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const workout = {title, load, reps}

        console.log(workout)
        
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        console.log(response)

        const json = await response.json()

        console.log(json)

        if(!response.ok){
            console.log(response)
            setError(json.error) // we have an error property on the json in the backend;
            setEmptyFields(json.emptyFields)
        }

        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({ // updating the state in the context to cause a re-render of the workouts list
                type:'CREATE_WORKOUT', 
                payload: json
            })
        }
    }

    console.log(emptyFields)

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Exercise title</label>
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