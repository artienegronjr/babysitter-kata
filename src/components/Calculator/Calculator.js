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

  const validateSubmission = (e) => {
    e.preventDefault(); //Prevents button from submitting form

    let isValid = true;

    isValid = validateStartTime();
    if (!isValid) {
      return isValid;
    }

    isValid = validateEndTime();
    if (!isValid) {
      return isValid;
    }

    isValid = validateBedTime();
    if (!isValid) {
      return isValid;
    }

    return isValid;
  }

  const validateStartTime = () => {
    let isValid = true;

    if (startTime === null){
      isValid = false;
      return isValid;
    }

    //Start time should be between 5pm and 3am
    if (startTime.getHours() >= 4 && startTime.getHours() <= 16) {
      isValid = false;
      return isValid;
    }

    return isValid;
  }

  const validateBedTime = () => {
    let isValid = true;

    if (bedTime === null){
      isValid = false;
      return isValid;
    }

    //Bed time must be after start time
    if (bedTime.getHours() < startTime.getHours()){
      isValid = false;
      return isValid;
    }

    //Bed time must be before end time
    if (bedTime.getHours() > endTime.getHours()){
      isValid = false;
      return isValid;
    }

    return isValid;
  }

  //Need to revisit. Not working as expected...
  const validateEndTime = () => {
    let isValid = true;

    if (endTime === null){
      isValid = false;
      return isValid;
    }

    //End time must be after start time
    if (endTime.getHours() <= startTime.getHours()){
      isValid = false;
      return isValid;
    }

    //End time cannot be after 4am
    if (endTime.getHours() > 4){
      isValid = false;
      return isValid;
    }

    return isValid;
  }

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
        <button onClick={validateSubmission}>Calculate</button>
      </form>
      </LocalizationProvider>
    </div>
  )
}
