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
  const [validationError, setValidationError] = React.useState("");

  const convertTime = (hour) => {
    //Will convert the given hour to an integer that represents an hour within a possible work day (5pm - 4am)
    //Makes validation calculations easier to deal with
    //5pm - 4am => 0 - 11
    if (hour >= 17 && hour <= 23){
      return hour - 17;
    }
    else {
      return hour + 7;
    }
  }

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

    setValidationError("");
    return isValid;
  }

  const validateStartTime = () => {
    let isValid = true;

    if (startTime === null){
      isValid = false;
      setValidationError("You must enter a start time.");
      return isValid;
    }

    const startHour = convertTime(startTime.getHours());

    if (startHour > 11) {
      isValid = false;
      setValidationError("You must enter a valid start time between 5pm and 3am.");
      return isValid;
    }

    return isValid;
  }

  const validateBedTime = () => {
    let isValid = true;

    if (bedTime === null){
      isValid = false;
      setValidationError("You must enter a bed time.");
      return isValid;
    }

    const startHour = convertTime(startTime.getHours());
    const bedHour = convertTime(bedTime.getHours());
    const endHour = convertTime(endTime.getHours());

    if (bedHour < startHour){
      isValid = false;
      setValidationError("Bedtime cannot be before the start time.");
      return isValid;
    }

    if (bedHour > endHour){
      isValid = false;
      setValidationError("Bedtime cannot be after the end time.");
      return isValid;
    }

    return isValid;
  }

  //Need to revisit. Not working as expected...
  const validateEndTime = () => {
    let isValid = true;

    if (endTime === null){
      isValid = false;
      setValidationError("You must enter an end time.");
      return isValid;
    }

    const startHour = convertTime(startTime.getHours());
    const endHour = convertTime(endTime.getHours());

    if (endHour <= startHour){
      isValid = false;
      setValidationError("The end time must be after the start time.");
      return isValid;
    }

    if (endHour > 11){
      isValid = false;
      setValidationError("The end time must not be after 4am.");
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
      <p className="error-message">{validationError}</p>
      </LocalizationProvider>
    </div>
  )
}
