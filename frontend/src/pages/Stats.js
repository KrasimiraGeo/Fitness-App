import classes from './Stats.module.css'
import { useEffect, useState } from 'react'

import { WorkoutDetails } from '../components/WorkoutDetails'

export const Stats = () => {

  const currentDate = new Date().toISOString().split('T')[0]
  const [filteredWorkouts, setFilteredWorkouts] = useState([])

  //displaying entries for the current month and year

  useEffect(() => {

    const getDays = async () => {
      const response = await fetch('/api/workouts/stats/' + currentDate)
      const json = await response.json()
      setFilteredWorkouts(json)
      console.log(json); // an array with exercise objects
    }

    getDays()
  }, [])

  console.log(filteredWorkouts)

  // workout details does not function properly: edit and delete functions;
  // BUT they work properly after a reload
  // filtered dates are not in the context workout array; returns null 

  return (
    <div className="wrapper">     
      <p>This is stats page</p>
      {/* <div className={classes.list}>
        {filteredWorkouts.map(workout => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div> */}
    </div>
  )
}