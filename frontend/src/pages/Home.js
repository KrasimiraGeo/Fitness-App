import { useEffect, Fragment } from 'react'

import { WorkoutDetails } from '../components/WorkoutDetails'
import { WorkoutForm } from '../components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { LandingPage } from './LandingPage'

export const Home = () => {

    const { workouts, dispatch } = useWorkoutsContext() // global context state instead of local 

    useEffect(() => {
        const fetchWorkouts = async () => { // fetch data from the backend
            const response = await fetch('/api/workouts') // in package json - added proxy to direct unknown requests to the backend server; otherwise stops them for cross origin; it will work only in development; in production it will not
            const json = await response.json() // an array ot workout objects
            // console.log(json)
            if (response.ok) {
                dispatch({
                    type: 'SET_WORKOUTS',
                    payload: json // the full array of workouts
                })
            }
        }

        fetchWorkouts()
    }, [dispatch])

    // console.log(workouts)

    return (
        <Fragment>
           <LandingPage />
            <div className="home">
                <div className='workouts'>
                    {workouts && workouts.map((workout) => (
                        <WorkoutDetails
                            key={workout._id}
                            workout={workout}
                        />
                    ))}
                </div>
                <WorkoutForm />
            </div>
        </Fragment>
    )
}