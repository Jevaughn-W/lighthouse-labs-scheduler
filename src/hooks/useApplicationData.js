import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

   // Functions to handle state change
   const setDay = day => setState(prev =>({ ...prev, day }));
  
   // UseEffect to make API call to get days data on render
   
   useEffect(() => {
     
     const routes = {
       getDays: "/api/days",
       getAppointments: "/api/appointments",
       getInterviews: "/api/interviewers"
     };
     
     // Updating states with data obtained from axios requests
     Promise.all([
       axios.get(routes.getDays),
       axios.get(routes.getAppointments),
       axios.get(routes.getInterviews)
     ]).then((all) => {
       setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
     });
   }, [])

   
   // Function to add in new interview for the day
   function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const newState = { // State state occurs when using previous state, need to manually reset state
      day: state.day,
      days: state.days,
      appointments: appointments,
      interviewers: state.interviewers,
    };

    setState(newState);

    return (
      axios.put(`api/appointments/${id}`, {interview})
        .then(()=> setState(newState))
        .then(()=> {numberOfSpots(newState);})
    );
  }

  // Function to make API request to remove interview
  function cancelInterview(id) {
    
    const appointment = {
      ...state.appointments[id], interview: null
    };

    const appointments = {
      ...state.appointments, [id]: appointment
    };
    
    const newState = { // State state occurs when using previous state, need to manually reset state
      day: state.day,
      days: state.days,
      appointments: appointments,
      interviewers: state.interviewers,
    };

    setState(newState);
    
  
    return (
      axios.delete(`/api/appointments/${id}`)
        .then((res)=>  setState(newState))
        .then(() => {numberOfSpots(newState)})
    );
  }

  // Count the remaining spots

  function numberOfSpots(state) {
    
    let day = state.days.find(element => element.name === state.day)
    let spots = 0;
    let days = [];
    const appointments = getAppointmentsForDay(state, state.day);
    

    for (let appointment in appointments) {
      if(appointments[appointment].interview === null) {
        spots += 1;
      }
    }
    
    // Iterate through days object and if day == to current state edit state
    state.days.forEach((dayObj) => {
      if (dayObj.name === state.day) {
        day = {...dayObj, spots}
        days.push(day);
      } else {
        days.push(dayObj);
      }
    })

    setState(prev => ({...prev, days}))
  }
  
  // Return functions
  return { state, setDay, bookInterview, cancelInterview };

}