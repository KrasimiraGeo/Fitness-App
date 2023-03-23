import { useState, useEffect } from "react";
import { LocalizationProvider, PickersDay, StaticDatePicker,} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Badge } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export const Calendar = (props) => {
    console.log(props);
  const [value, setValue] = useState(new Date());
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 11, 21]);

  const dateFormatHandler= (date)=>{
    let formattedDate = date.toISOString().split('T')[0]   
    props.selectDate(formattedDate)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        orientation="portrait"
        value={value}
        disableFuture
        onChange={dateFormatHandler}
        slots={{
          day: (props) => {
            const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.getDate()) >= 0;
          
            return (
              <Badge
                key={props.day.toString()}
                overlap="circular"
                badgeContent={isSelected ? <CheckIcon htmlColor="#FDCA40"/> : undefined}
              >
                <PickersDay {...props} />
              </Badge>
            );
          },
        }}
      />
    </LocalizationProvider>
  );
};