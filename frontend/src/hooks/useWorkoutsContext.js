import { WorkoutsCtx } from "../context/WorkoutContext";  //the actual context
import { useContext } from "react"; // used to consume the context

export const useWorkoutsContext = () => {

    const ctx = useContext(WorkoutsCtx) // returns the value of the WorkoutsCTX that we passed trough the provider component

    if (!ctx) { // if we don't have a value for the ctx
        throw Error('useWorkoutsContext must be used inside WorkoutsContextProvider')
    }
    
    return ctx
}
