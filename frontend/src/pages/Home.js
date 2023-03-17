import {useState, useEffect} from 'react'


import {WorkoutDetails} from '../components/WorkoutDetails'

export const Home = () =>{

    const [workouts, setWorkouts] = useState(null)

    useEffect(()=>{
        const fetchWorkouts = async () =>{ // fetch data from the backend
            const response = await fetch('/api/workouts') // in package json - added proxy to direct unknown requests to the backend server; otherwise stops them for cross origin; it will work only in development; in production it will not
            const json = await response.json() // an array ot workout objects

            if(response.ok){
                setWorkouts(json)
            }
        }

        fetchWorkouts()
    }, [])

    return (
        <div className="home">
            <div className='workouts'>
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails 
                    key ={workout._id}
                    workout ={workout}
                    />
                ))}
            </div>
        </div>
    )
}