import React from 'react';
import './Calculator.css';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';
import TextField from '@material-ui/core/TextField';

export default function Calculator() {
  const [startTime, setStartTime] = React.useState(null);
  const [bedTime, setBedTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);

  return (
    <div className="Calculator">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form>
        <TimePicker 
          label="Start Time"
          value={startTime}
          onChange={(newValue) => {
            setStartTime(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker 
          label="Bed Time"
          value={bedTime}
          onChange={(newValue) => {
            setBedTime(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker 
          label="End Time"
          value={endTime}
          onChange={(newValue) => {
            setEndTime(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <button>Calculate</button>
      </form>
      </LocalizationProvider>
    </div>
  )
}
