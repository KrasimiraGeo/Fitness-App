import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useState } from 'react';


export const Calendar = () => {

    const [value, setValue]= useState(new Date())

    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker 
        orientation="portrait" 
        openTo='day'
        value={value}
        onChnage={(newValue)=>{
            setValue(newValue)
        }}
        // renderInput={(params)=>{ <TextField {...params}/>}}
        />
      </LocalizationProvider>
    )
}