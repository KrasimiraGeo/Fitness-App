import { createContext, useReducer } from "react";


export const WorkoutsCtx = createContext()  // creating context

export const workoutsReducer = (state, action) => {
    //state is previous state value
    //action, type and payload

    //check the action type 

    console.log(action)
    console.log(state)
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]  // a single new workout object and a desctructured array of previous workouts 
            }
        case 'DELETE_WORKOUT':
            return { // filter the current workouts; previous state and remove the one that matched the id of the one in the payload; triggered in the workout details component
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        case 'EDIT_WORKOUT': // reload the workouts
        const updatedWorkoutIndex = state.workouts.findIndex(workout => workout._id === action.payload._id);
        console.log(updatedWorkoutIndex);
        const updatedWorkouts = [...state.workouts];
        updatedWorkouts[updatedWorkoutIndex] = action.payload;
        console.log(updatedWorkouts)
        return {
          workouts: updatedWorkouts
        }

        default:
            return state
    }


}

export const WorkoutsCtxProvider = ({ children }) => {
    //children is whatever component or template that the component wraps
    // children==App
    //props.children

    // we get a state value and a func to update the state value; 
    // the reducer func to update the state has a type of action
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    return ( // wrap to provide access to the whole app that needs to access the context
        <WorkoutsCtx.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsCtx.Provider>
    )

}