import classes from './Stats.module.css'
import { useEffect } from 'react'
export const Stats = () =>{


    useEffect (()=>{

        const getDays = async () => {
          const response = await fetch ('/api/workouts/stats')
          const json = await response.json()
          console.log(json);
        }
    
        getDays()
      },[])

    // calendar is with its built in functionalities
    return(
        <div className={classes.wrapper}>
            <p>This is stats page</p>
            {/* <Calendar/> */}
        </div>
    )
}